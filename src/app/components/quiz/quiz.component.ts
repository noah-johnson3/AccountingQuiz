import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';
import { Entry } from 'src/app/models/entry';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
// an Array, that holds Answer Arrays
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  submittedAnswers: [Answer[]] = [[]];
  currentQuestion: null | Question = new Question();
  questionIndex: number = 0;
  currentAnswer: null | Question = new Question();
  totalScore: number = 0;
  quizComplete: boolean = false;
  answeredWrong: boolean = false;

  // ************SETUP************
  constructor(private quizService: QuizService) {}

  // Retrieves data on Page Load
  ngOnInit(): void {
    this.retrieveQuestions();
  }

  // ************PAGE DYNAMICS************

  // Gets the next Question in the array of Questions and creates an Answer structure for the user so they can fill out
  // the question with the correct amount of inputs for the data.
  getNextQuestion(): void {
    if (this.questionIndex >= this.questions.length) {
      this.quizComplete = true;
      this.currentQuestion = null;
      this.currentAnswer = null;
    } else {
      this.currentQuestion = this.questions[this.questionIndex];
      this.questionIndex++;
      this.currentAnswer = this.buildUserAnswer(this.currentQuestion);
    }
  }

  buildUserAnswer(question: Question): Question {
    let result = new Question();

    for (let aIdx = 0; aIdx < question.correct_answers.length; aIdx++) {
      result.correct_answers.push(new Answer());

      for (
        let eIdx = 0;
        eIdx < question.correct_answers[aIdx].entries.length;
        eIdx++
      ) {
        result.correct_answers[aIdx].entries.push(new Entry());
        if (!question.correct_answers[aIdx].entries[eIdx].Cr) {
          question.correct_answers[aIdx].entries[eIdx].Cr = null;
        }
        if (!question.correct_answers[aIdx].entries[eIdx].Dr) {
          question.correct_answers[aIdx].entries[eIdx].Dr = null;
        }
      }
    }
    return result;
  }

  submitAnswers(): void {
    let isCorrect = true;
    if (this.currentQuestion !== null && this.currentAnswer !== null) {
      for (
        let aIdx = 0;
        aIdx < this.currentAnswer.correct_answers.length;
        aIdx++
      ) {
        if (
          !this.currentAnswer?.correct_answers[aIdx].checkIndividualProperties(
            this.currentQuestion.correct_answers[aIdx]
          )
        ) {
          isCorrect = false;
          this.answeredWrong = true;
          window.alert("Wrong answer. Try Again.");
          break;
        } else {
          this.answeredWrong = false;
        }
      }
      if (isCorrect) {
        this.getNextQuestion();
      }
    }
  }

  quizAgain(): void{
    this.questionIndex = 0;
    this.quizComplete = false;
    this.getNextQuestion();
  }
  // ************SERVICE METHODS************

  retrieveQuestions(): void {
    this.quizService.getQuestions().subscribe({
      next: (questions) => {
        this.questions = questions;
        this.getNextQuestion();
      },
      error: (problem) => {
        console.error('HttpComponent.reload(): error loading questions');
        console.error(problem);
      },
    });
  }
}
