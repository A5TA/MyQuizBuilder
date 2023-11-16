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
  filteredQuizzes: singleQuiz[] = [];
  searchText: string = '';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((data: any) => {
      this.quizzesList = data;
      this.filteredQuizzes = data; 
    });
  }

  onQuizClicked(id: number) {
    this.router.navigate([`/quiz/${id}`])
  }

  updateFilteredQuizzes() {
    this.filteredQuizzes = this.quizzesList.filter(
      quiz => quiz.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  //bonus feature 
  getDisplayedName(name: string): string {
    const maxCharacters = 20;
    if (name.length <= maxCharacters) {
      return name;
    } else {
      return name.slice(0, maxCharacters) + '...';
    }
  }
}
