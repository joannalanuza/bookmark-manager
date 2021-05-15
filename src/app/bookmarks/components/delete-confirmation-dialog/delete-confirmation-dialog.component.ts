import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Delete Confirmation Dialog
 */
@Component({
    selector: 'app-delete-confirmation-dialog',
    templateUrl: './delete-confirmation-dialog.component.html',
})
export class DeleteConfirmationDialogComponent {
    id = '';
    name = '';
    url = '';

    constructor(
        private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.id = data.id;
        this.name = data.name;
        this.url = data.url;
    }

    onConfirm() {
        this.dialogRef.close(this.id);
    }

    onCancel() {
        this.dialogRef.close();
    }
}