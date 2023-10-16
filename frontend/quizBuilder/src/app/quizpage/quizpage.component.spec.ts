import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizpageComponent } from './quizpage.component';

describe('QuizpageComponent', () => {
  let component: QuizpageComponent;
  let fixture: ComponentFixture<QuizpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizpageComponent]
    });
    fixture = TestBed.createComponent(QuizpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
