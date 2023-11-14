import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-goto-quiz-dialog',
  templateUrl: './goto-quiz-dialog.component.html',
  styleUrls: ['./goto-quiz-dialog.component.scss']
})
export class GotoQuizDialogComponent {
  // quizId: any;
  quizIdToInteger: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<GotoQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quizId: any }
  ) {
    // console.log("the id passed in is ", data.quizId)
    this.quizIdToInteger = data.quizId;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog without saving
  }
}