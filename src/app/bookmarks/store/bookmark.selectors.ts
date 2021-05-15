import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkState, bookmarksFeatureKey, selectAll } from './bookmark.reducer';
import { Bookmark } from '../models/bookmark.model';

export const selectBookmarkState = createFeatureSelector<BookmarkState>(
    bookmarksFeatureKey
);

export const selectBookmarks = createSelector(selectBookmarkState, selectAll);


export const selectBookmarkGroups = createSelector(
    selectBookmarks,
    (bookmarks: Bookmark[]) => {
        const groups = Object.keys(groupBy(bookmarks, 'group'));
        return groups;
    }
);


export const selectBookmarksByGroup = (group: string) => createSelector(
    selectBookmarks,
    (bookmarks: Bookmark[]) => {
        return bookmarks.filter(b => b.group === group);
    }
);

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}
