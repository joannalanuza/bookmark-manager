import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Bookmark } from '../models/bookmark.model';

// Load Bookmarks
export const loadBookmarks = createAction(
  '[Bookmark List Component] Load Bookmarks'
);

export const loadBookmarksSuccess = createAction(
    '[Bookmark List Effect] Load Bookmarks Success',
    props<{ bookmarks: Bookmark[] }>()
);
export const loadBookmarksFailure = createAction(
    '[Bookmark List Effect] Load Bookmarks Failure',
    props<{ error: any }>()
);

// Add Bookmark
export const addBookmark = createAction(
  '[Bookmark Add Component] Add Bookmark',
  props<{ bookmark: Bookmark }>()
);
export const addBookmarkSuccess = createAction(
    '[Bookmark Add Effect] Add Bookmark Success',
    props<{ bookmark: Bookmark }>()
);
export const addBookmarkFailure = createAction(
    '[Bookmark Add Effect] Add Bookmark Failure',
    props<{ error: any }>()
);

// Edit Bookmark
export const updateBookmark = createAction(
  '[Bookmark Edit Component] Update Bookmark',
  props<{ bookmark: Update<Bookmark> }>()
);

// Delete Bookmark
export const deleteBookmark = createAction(
  '[Bookmark Delete Components] Delete Bookmark',
  props<{ id: string }>()
);
export const deleteBookmarkSuccess = createAction(
    '[Bookmark Delete Effect] Delete Bookmark Success',
    props<{ id: string }>()
);
export const deleteBookmarkFailure = createAction(
    '[Bookmark Delete Effect] Delete Bookmark Failure',
    props<{ error: any }>()
);