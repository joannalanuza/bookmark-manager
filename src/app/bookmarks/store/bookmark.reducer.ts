import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Bookmark } from '../models/bookmark.model';
import * as BookmarkActions from './bookmark.actions';

export const bookmarksFeatureKey = 'bookmarks';

export interface BookmarkState extends EntityState<Bookmark> {
  // additional entities state properties
    error: any;
}

export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: BookmarkState = adapter.getInitialState({
  // additional entity state properties
    error: undefined
});

const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkActions.addBookmarkSuccess,
      (state, action) => adapter.addOne(action.bookmark, state)
  ),
  on(BookmarkActions.addBookmarkFailure, (state, action) => {
          return {
              ...state,
              error: action.error
          }
      }
  ),
    on(BookmarkActions.loadBookmarksSuccess, (state, action) =>
        adapter.addAll(action.bookmarks, state)
    ),
    on(BookmarkActions.loadBookmarksFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
  on(BookmarkActions.updateBookmark,
    (state, action) => adapter.updateOne(action.bookmark, state)
  ),
  on(BookmarkActions.deleteBookmarkSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
    on(BookmarkActions.deleteBookmarkFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
);

export function reducer(state: BookmarkState | undefined, action: Action) {
  return bookmarkReducer(state, action);
}

export const {
  selectAll,
} = adapter.getSelectors();
