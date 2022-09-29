import {Entreprise} from './Entreprise';

export class Banque {
  constructor(public id?: number,
              public version?: number,
              public  nom?: string,
              public entreprise?: Entreprise) {
  }
}
