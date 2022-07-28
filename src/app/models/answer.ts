import { Entry } from './entry';
export class Answer {

  type : string;
  entries : Entry [];

  constructor(type='', entries=[]){
    this.type = type;
    this.entries = entries;
  }

  checkIndividualProperties(answer : Answer): boolean{
    if(this.type !== answer.type){
      return false;
    }
    if(answer.entries.length !== this.entries.length){
      return false;
    } else {
      for(let i = 0; i < this.entries.length; i++){
        if(this.entries[i].when.startsWith("0")){
          this.entries[i].when = this.entries[i].when.substring(1);
        }
        if(this.entries[i].when !== answer.entries[i].when){

          return false;
        }
        if(this.entries[i].type !== answer.entries[i].type){
          return false;
        }
        if(this.entries[i].Cr !== answer.entries[i].Cr){
          return false;
        }
        if(this.entries[i].Dr !== answer.entries[i].Dr){
          return false;
        }
      }
    }
    return true;
  }
}
