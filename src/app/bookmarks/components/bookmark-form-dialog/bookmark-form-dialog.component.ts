import {Component, OnInit, Inject} from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark } from '../../models/bookmark.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookmarkService } from '../../services/bookmark.service';
import { BookmarkState } from '../../store/bookmark.reducer';
import * as uuid from 'uuid';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';

/**
 * BookmarkFormDialog
 */
@Component({
    selector: 'app-bookmark-form-dialog',
    templateUrl: './bookmark-form-dialog.component.html'
})
export class BookmarkFormDialogComponent implements OnInit {
    public bookmarkForm: FormGroup;
    isEditForm = false;
    name = '';
    url = '';
    group = '';

    constructor(
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<BookmarkFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private productService: BookmarkService,
        private store: Store<BookmarkState>
    ) {
        this.name = data.bookmarkData.name;
        this.url = data.bookmarkData.url;
        this.group = data.bookmarkData.group;
        this.isEditForm = data.isEditForm;
    }
    ngOnInit() {
        this.buildForm();
    }

    buildForm()
    {
        this.bookmarkForm = this.fb.group({
            name: [this.data.bookmarkData.name ? this.data.bookmarkData.name : '', [Validators.required]],
            url: [this.data.bookmarkData.url ? this.data.bookmarkData.url : '', [Validators.required]],
            group: [this.data.bookmarkData.group ? this.data.bookmarkData.group : '', [Validators.required]],
        });
    }

    onSubmit(): void {
        const bookmarkData = new BookmarkData();
        bookmarkData.id = this.data.bookmarkData.id ? this.data.bookmarkData.id : uuid.v4();
        bookmarkData.name = this.bookmarkForm.get('name').value;
        bookmarkData.url = this.bookmarkForm.get('url').value;
        bookmarkData.group = this.bookmarkForm.get('group').value;
        this.dialogRef.close(bookmarkData);
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    public hasError = (controlName: string, error: string) => {
        return this.bookmarkForm.controls[controlName].hasError(error);
    }

}

export class DialogData {
    public bookmarkData: BookmarkData;
    isEditForm = false;

    constructor(isEditForm: boolean, bookmarkData: BookmarkData) {
        this.isEditForm = isEditForm;
        if (!isEditForm) {
            this.bookmarkData = new BookmarkData();
        } else {
            this.bookmarkData = bookmarkData;
        }
    }
}

export class BookmarkData implements Bookmark {
    id = '';
    name = '';
    url = '';
    group = '';
}