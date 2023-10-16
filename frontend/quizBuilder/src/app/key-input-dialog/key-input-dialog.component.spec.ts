import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyInputDialogComponent } from './key-input-dialog.component';

describe('KeyInputDialogComponent', () => {
  let component: KeyInputDialogComponent;
  let fixture: ComponentFixture<KeyInputDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyInputDialogComponent]
    });
    fixture = TestBed.createComponent(KeyInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
