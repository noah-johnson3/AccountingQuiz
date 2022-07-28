import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Question } from './../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // Injecting HttpClient to make GET request for quiz data
  private url = "https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json";
  constructor(private http: HttpClient) { }

  // Sending request to the server that has the URL to get quiz data
  getQuestions():Observable<Question[]>{
    return this.http.get<Question[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Error retrieving questions' + err)
        );
      })
    );
  }
}


