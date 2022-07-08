import {Travaux} from './travaux';
import {DetailVersement} from './DetailVersement';

export class Versement {
  constructor(public id?: number,
              public version?: number,
              public  date?: Date,
              public solde?: number,
              public reste?: number,
              public  detailVersement?: DetailVersement[],
              public travaux?: Travaux) {
  }


}
