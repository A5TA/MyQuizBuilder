import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// export interface DialogData {
//   quizId: string,
// }

@Component({
  selector: 'app-key-input-dialog',
  templateUrl: './key-input-dialog.component.html',
  styleUrls: ['./key-input-dialog.component.scss']
})

export class KeyInputDialogComponent {
  quizId :number | undefined;

  constructor(public dialogRef: MatDialogRef<KeyInputDialogComponent>) {}

  onConfirm(): void {
    // Handle the quizID value, e.g., store it in a variable or use it for navigation
    this.dialogRef.close(this.quizId);
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
