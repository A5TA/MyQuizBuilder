import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';

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


  constructor(private quizService: QuizService) {}

  addQuestion() {
    this.questions.push({ question: '', answer: '' });
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1); //Delete the question by index
  }

  createQuiz(formData: any) {
    this.quizData = {
      name: formData.quizName,
      length: this.questions.length,
      qna: this.questions,
    };

    this.quizService.createQuiz(this.quizData).subscribe(res => {
      console.log(res);
    });

    // console.log(this.quizData)
  }

  validate() {
    return this.questions.length != 0;
  }
}
