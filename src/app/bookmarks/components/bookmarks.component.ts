import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Update } from "@ngrx/entity";
import { Bookmark } from '../models/bookmark.model';
import { BookmarkState } from '../store/bookmark.reducer';
import { BookmarkService } from '../services/bookmark.service';
import {addBookmark, updateBookmark} from '../store/bookmark.actions';
import * as fromActions from '../store/bookmark.actions';
import {selectBookmarks, selectBookmarkGroups, selectBookmarksByGroup} from '../store/bookmark.selectors';
import {BookmarkFormDialogComponent, BookmarkData, DialogData} from './bookmark-form-dialog/bookmark-form-dialog.component';
import {DeleteConfirmationDialogComponent} from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html'
})
export class BookmarksComponent implements OnInit, OnDestroy {
    bookmarks$: Observable<Bookmark[]>;
    groups$: Observable<string[]>;
    _mobileQueryListener: () => void;
    subscriptions = new Subscription();
    mobileQuery: MediaQueryList;
    displayedColumns: string[] = ['Name', 'URL', 'Group', 'Actions'];
    selectedGroup: string;
    panelOpenState = true;

    constructor(
        private bookmarkService: BookmarkService,
        public router: Router,
        private store: Store<BookmarkState>,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public dialog: MatDialog
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.selectedGroup = 'All';
        this.store.dispatch(fromActions.loadBookmarks());
        this.loadBookmarks();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.subscriptions.unsubscribe();
    }

    loadBookmarks() {
        this.bookmarks$ = this.store.pipe(select(selectBookmarks));
        this.groups$ = this.store.pipe(select(selectBookmarkGroups));
    }

    addBookmark(bookmarkData: Bookmark) {
        this.store.dispatch(addBookmark({ bookmark: bookmarkData }));
    }

    editBookmark(bookmark: Bookmark) {
        const update: Update<Bookmark> = {
            id: bookmark.id,
            changes: bookmark
        };

        this.store.dispatch(updateBookmark({ bookmark: update }));
    }
    deleteBookmark(id: string) {
        this.store.dispatch(fromActions.deleteBookmark({ id }));
    }

    selectGroup(group: string) {
        this.selectedGroup = group;
        if (group === 'All') {
            this.bookmarks$ = this.store.pipe(select(selectBookmarks));
        } else {
            this.bookmarks$ = this.store.pipe(select(selectBookmarksByGroup(group)));
        }
    }

    openDialog(isEditForm: boolean = false, bookmark?: BookmarkData ): void {
        const dialogData = new DialogData(isEditForm, bookmark);

        const dialogRef = this.dialog.open(BookmarkFormDialogComponent, {
            width: '600px',
            data: dialogData
        });

        this.subscriptions.add(
            dialogRef.afterClosed().subscribe(data => {
                if (data) {
                    if (isEditForm) {
                        this.editBookmark(data);
                    } else {
                        this.addBookmark(data);
                    }
                }
            })
        );
    }

    openDeleteConfirmationDialog(bookmark: Bookmark) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = bookmark;

        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            id => {
                if (id) {
                    this.deleteBookmark(id);
                }
            }
        );
    }
}