import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoQuizDialogComponent } from './goto-quiz-dialog.component';

describe('GotoQuizDialogComponent', () => {
  let component: GotoQuizDialogComponent;
  let fixture: ComponentFixture<GotoQuizDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GotoQuizDialogComponent]
    });
    fixture = TestBed.createComponent(GotoQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
