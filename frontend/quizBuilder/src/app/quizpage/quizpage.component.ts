import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';


interface questionItem {
  question: string;
  answer: string;
}

//This is the data format to be sent to flask server
interface entireQuizData {
  question: string;
  answer: string;
  userAnswer: string;
}

@Component({
  selector: 'app-quizpage',
  templateUrl: './quizpage.component.html',
  styleUrls: ['./quizpage.component.scss']
})
export class QuizpageComponent implements OnInit{
  quizId: number | undefined;
  quizData: any;
  questionsAndAnswers: questionItem[] = [];
  inputedAnswer: string[] = [];
  submitQuizData: entireQuizData[] = [];
  // quizData$: any;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.quizId = Number(params.get('id'));
      if (this.quizId !== undefined) {
        this.quizService.fetchQuiz(this.quizId).subscribe(data => {
          this.quizData = data;
          // console.log(this.quizData);
          this.questionsAndAnswers = this.quizData.qna;
          // console.log(this.questionsAndAnswers);
          this.initInputArray();
        });
      }
    });

  }

  initInputArray() {
    //we need to initialize the array of inputedAnswer to length of questions
    for (let i = 0; i < this.quizData.length; i++) {
      this.inputedAnswer.push("");
    }
    // console.log(this.inputedAnswer)
  }

  submitQuiz() {
    this.submitQuizData = [];
    //lets combine all the qna and user answers into one data object to be sent to the server
    for (let i = 0; i < this.questionsAndAnswers.length; i++) {
      this.submitQuizData.push({
        question: this.questionsAndAnswers[i].question,
        answer: this.questionsAndAnswers[i].answer,
        userAnswer: this.inputedAnswer[i]
      })
    }
    console.log(this.submitQuizData);
  }
  
}
