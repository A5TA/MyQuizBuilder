import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizmakerComponent } from './quizmaker.component';

describe('QuizmakerComponent', () => {
  let component: QuizmakerComponent;
  let fixture: ComponentFixture<QuizmakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizmakerComponent]
    });
    fixture = TestBed.createComponent(QuizmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
