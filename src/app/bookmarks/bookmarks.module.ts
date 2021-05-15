import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromBookmark from './store/bookmark.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookmarkEffects } from './store/bookmark.effects';
import { BookmarkService } from './services/bookmark.service';
import { BookmarksComponent } from './components/bookmarks.component';
import { BookmarkFormDialogComponent } from './components/bookmark-form-dialog/bookmark-form-dialog.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
    declarations: [
        BookmarksComponent,
        BookmarkFormDialogComponent,
        DeleteConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BookmarksRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
        MatDividerModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatExpansionModule,
        StoreModule.forFeature(fromBookmark.bookmarksFeatureKey, fromBookmark.reducer),
        EffectsModule.forFeature([BookmarkEffects])
    ],
    providers: [
        BookmarkService
    ],
    exports: [
        BookmarksComponent,
        BookmarkFormDialogComponent,
        DeleteConfirmationDialogComponent
    ],
    entryComponents: [
        BookmarkFormDialogComponent,
        DeleteConfirmationDialogComponent
    ],
})
export class BookmarksModule { }
