import { Answer } from "./answer";

export class Question {

  title : string;
  description : string;
  correct_answers : Answer [];

  constructor (title='', description='', correct_answers=[]){
    this.title = title;
    this.description = description;
    this.correct_answers = correct_answers;
  }
}
