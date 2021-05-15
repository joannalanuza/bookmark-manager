import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkFormDialogComponent } from './bookmark-form-dialog.component';

describe('BookmarkFormDialogComponent', () => {
    let component: BookmarkFormDialogComponent;
    let fixture: ComponentFixture<BookmarkFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BookmarkFormDialogComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookmarkFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});