import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface quizSchema{
  name: string;
  length: number;
  qna: questionItem[];
}

// This interface was needed so i could modify list values in the frontend
interface questionItem {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseURL: string = "http://127.0.0.1:5000"
  constructor(private http: HttpClient) { }

  // This funtion will make the get request to find the created quiz by the id/key it generates
  fetchQuiz(key: number) {
    console.log("The key entered in is ",key);
    // Make a GET request using HttpClient
    return this.http.get(`${this.baseURL}/getKey/${key}`);
  }

  createQuiz(quizData: quizSchema) {
    console.log(quizData);
    return this.http.post(`${this.baseURL}/createKey`, quizData)

  }

}
