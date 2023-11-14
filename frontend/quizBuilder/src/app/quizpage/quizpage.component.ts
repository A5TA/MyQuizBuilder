import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';


interface questionItem {
  question: string;
  answer: string;
}

//This is the data format to be sent to flask server
interface QNAData {
  question: string;
  answer: string;
  userAnswer: string;
}

interface GradeData {
  message: string[] | string; // Assuming 'message' is a string
  // Add other fields if present in the response
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
  inputedAnswer: string[] = []; //this
  submitQuizData: QNAData[] = [];
  gradeData: GradeData | undefined;
  testDone: boolean = false;
  isCorrectArray: boolean[] = [];
  finalScore: number = 0;
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
    
    this.quizService.gradeQuiz(this.submitQuizData).subscribe(data => {
      this.gradeData = data as GradeData;
      console.log(this.gradeData.message);

      if (this.gradeData.message === "Something went wrong") {
        console.log("An error has occured when grading the quiz")
      } else {
        //test done
        this.testDone = true;
        this.showScore();
      }
    });
    }
  
    showScore() {
      this.finalScore = 0;
      for (let i = 0; i < this.questionsAndAnswers.length; i++) {
        if (this.gradeData?.message[i] === "high") {
          this.isCorrectArray[i] = true;
          this.finalScore++;
        } else {
          this.isCorrectArray[i] = false;
        }    
      }
      this.finalScore = (this.finalScore / this.questionsAndAnswers.length) * 100;
      console.log(this.finalScore);

      console.log("TODO -- Make the score show for each question");
    }
}
