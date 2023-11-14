import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';


interface singleQuiz {
  id: number,
  name: string,

}
@Component({
  selector: 'app-all-the-quizzes-page',
  templateUrl: './all-the-quizzes-page.component.html',
  styleUrls: ['./all-the-quizzes-page.component.scss']
})
export class AllTheQuizzesPageComponent implements OnInit {
  quizzesList: singleQuiz[] = [];
  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((data: any) => {
      this.quizzesList = data;
    });

  }

}
