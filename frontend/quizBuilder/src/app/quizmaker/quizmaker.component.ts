import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { GotoQuizDialogComponent } from '../goto-quiz-dialog/goto-quiz-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

interface quizSchema{
  name: string;
  length: number;
  qna: questionItem[];
}

// This interface was needed so i could modify list values in the frontend
interface questionItem {
  question: string;
  answer: string;
}

//looks like ex: {id: 13, message: 'Quiz successfully added to the database with ID: 13'}
interface resultData {
  id: number;
  message: string;
}

@Component({
  selector: 'app-quizmaker',
  templateUrl: './quizmaker.component.html',
  styleUrls: ['./quizmaker.component.scss']
})
export class QuizmakerComponent {
  questions: questionItem[] = [];
  quizData: quizSchema = {
    name: '',
    length: 0,
    qna: [],  
  };
  quizId: any;

  constructor(private quizService: QuizService, public dialog: MatDialog, private router: Router) {}

  addQuestion() {
    this.questions.push({ question: '', answer: '' });
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1); //Delete the question by index
  }

  async createQuiz(formData: any) {
    this.quizData = {
      name: formData.quizName,
      length: this.questions.length,
      qna: this.questions,
    };

    try {
      const res: any = await lastValueFrom(this.quizService.createQuiz(this.quizData));

      console.log(res);
      this.quizId = (res as resultData)?.id;

      const dialogRef = this.dialog.open(GotoQuizDialogComponent, {
        data: { quizId: this.quizId },
      });

      const result: boolean | undefined = await lastValueFrom(dialogRef.afterClosed()) || false;
      console.log('The dialog was closed with result: ', result);
      if (result) {
        this.goToNewQuiz();
      }

      // Handle the result if needed.
    } catch (error) {
      console.error('Error creating quiz:', error);
      // Handle the error if needed.
    }
  }

  goToNewQuiz(){
    this.router.navigate([`/quiz/${this.quizId}`]);
  }

  validate() {
    return this.questions.length != 0;
  }
}
