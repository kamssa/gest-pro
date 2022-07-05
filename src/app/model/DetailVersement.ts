import {Travaux} from './travaux';
import {Client} from './Client';
import {Employe} from './Employe';
import {Versement} from './Versement';

export class DetailVersement {
  constructor(public id?: number,
              public version?: number,
              public  date?: Date,
              public montantVerse?: number,
              public employe?: Employe,
              public travaux?: Travaux) {
  }

}
