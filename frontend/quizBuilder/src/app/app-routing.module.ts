import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizmakerComponent } from './quizmaker/quizmaker.component';
import { QuizpageComponent } from './quizpage/quizpage.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'quiz-maker', component:QuizmakerComponent},
  {path: 'quiz/:id', component:QuizpageComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
