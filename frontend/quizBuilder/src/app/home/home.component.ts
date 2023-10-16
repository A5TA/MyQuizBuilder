import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KeyInputDialogComponent } from '../key-input-dialog/key-input-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  description: string = `QuizBuilder is an application that empowers you to create your quizzes. You can input quiz questions and their answers, and our system will generate a unique ID for your quiz. This ID is like a key that you can share with your friends, fellow students, or colleagues. They can use this key to access your quiz, take the test, and receive grading by ChatGPT.`;
  quizId: number | undefined;
  constructor(private router: Router, public dialog: MatDialog) { }

  createKey() {
    // Route to building page and create a key
    console.log('Create Key button clicked.');
    this.router.navigate(['/quiz-maker']);
  }

  enterKey() {
    // Logic for opening dialog and using key
    const dialogRef = this.dialog.open(KeyInputDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result: ', result);
      if (result !== undefined) {
        // IF the user actually entered in a id lets route
        this.quizId = result;
        this.routeToQuiz();
      }
    });

  }

  routeToQuiz() {
    this.router.navigate([`/quiz/${this.quizId}`]);
  }
}
