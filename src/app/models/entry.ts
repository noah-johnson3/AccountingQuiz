export class Entry {

  when : string;
  type : string;
  Dr : number | null;
  Cr: number | null;

  constructor(when='', type='', Dr = null, Cr = null){
    this.when = when;
    this.type = type;
    this.Dr = Dr;
    this.Cr = Cr;
  }
}
