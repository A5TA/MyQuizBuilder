import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTheQuizzesPageComponent } from './all-the-quizzes-page.component';

describe('AllTheQuizzesPageComponent', () => {
  let component: AllTheQuizzesPageComponent;
  let fixture: ComponentFixture<AllTheQuizzesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTheQuizzesPageComponent]
    });
    fixture = TestBed.createComponent(AllTheQuizzesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
