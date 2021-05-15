import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, concatMap } from 'rxjs/operators';
import { BookmarkService } from '../services/bookmark.service';
import * as fromBookmarkActions from './bookmark.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class BookmarkEffects {
    loadBookmarks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBookmarkActions.loadBookmarks),
            mergeMap(() =>
                this.bookmarkService.getBookmarks().pipe(
                    map(bookmarks => fromBookmarkActions.loadBookmarksSuccess({ bookmarks })),
                    catchError(error =>
                        of(fromBookmarkActions.loadBookmarksFailure({ error }))
                    )
                )
            )
        )
    );
    createBookmark$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBookmarkActions.addBookmark),
            mergeMap(action =>
                this.bookmarkService.createBookmark(action.bookmark).pipe(
                    map(bookmark => fromBookmarkActions.addBookmarkSuccess({ bookmark })),
                    catchError(error =>
                        of(fromBookmarkActions.addBookmarkFailure({ error }))
                    )
                )
            )
        )
    );

    updateBookmark$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromBookmarkActions.updateBookmark),
                concatMap(action =>
                    this.bookmarkService.editBookmark(
                        action.bookmark.id,
                        action.bookmark.changes
                    )
                )
            ),
        { dispatch: false }
    );

    deleteBookmark$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBookmarkActions.deleteBookmark),
            mergeMap(action =>
                this.bookmarkService.deleteBookmark(action.id).pipe(
                    map(() => fromBookmarkActions.deleteBookmarkSuccess({ id: action.id })),
                    catchError(error =>
                        of(fromBookmarkActions.deleteBookmarkFailure({ error }))
                    )
                )
            )
        )
    );


  constructor(private actions$: Actions,
              private bookmarkService: BookmarkService,
              private router: Router) {}

}
