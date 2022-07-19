import {DetailVersement} from './DetailVersement';
import {Projet} from './projet';

export class Versement {
  constructor(public id?: number,
              public version?: number,
              public  date?: Date,
              public solde?: number,
              public reste?: number,
              public  detailVersement?: DetailVersement[],
              public projet?: Projet) {
  }


}
