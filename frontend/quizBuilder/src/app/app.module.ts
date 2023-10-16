import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon'

import { FormsModule } from '@angular/forms';
import { QuizmakerComponent } from './quizmaker/quizmaker.component';
import { QuizpageComponent } from './quizpage/quizpage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { KeyInputDialogComponent } from './key-input-dialog/key-input-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizmakerComponent,
    QuizpageComponent,
    NotFoundComponent,
    KeyInputDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
