import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bookmark } from '../models/bookmark.model';

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {
    constructor(private http: HttpClient) {}

    baseUrl: string = 'http://localhost:3000/bookmarks/';

    createBookmark(model: Bookmark): Observable<Bookmark> {
        return this.http.post<Bookmark>(this.baseUrl, model);
    }

    getBookmarks(): Observable<Bookmark[]> {
        return this.http.get<Bookmark[]>(this.baseUrl);
    }

    editBookmark(
        bookmarkId: string | number,
        changes: Partial<Bookmark>
    ): Observable<Bookmark> {
        return this.http.put<Bookmark>(this.baseUrl + bookmarkId, changes);
    }

    deleteBookmark(bookmarkId: string) {
        return this.http.delete(this.baseUrl + bookmarkId);
    }
}