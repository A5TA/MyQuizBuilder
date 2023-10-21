import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-quizpage',
  templateUrl: './quizpage.component.html',
  styleUrls: ['./quizpage.component.scss']
})
export class QuizpageComponent implements OnInit{
  quizId: number | undefined;
  quizData: any;
  // quizData$: any;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.quizId = Number(params.get('id'));
      if (this.quizId !== undefined) {
        this.quizService.fetchQuiz(this.quizId).subscribe(data => {
          this.quizData = data;
          console.log(this.quizData);
        });
      }
    });
  }

  
}
