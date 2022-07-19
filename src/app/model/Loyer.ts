import {DetailLoyer} from './DetailLoyer';
export class Loyer {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public montant?: number,
              public date?: Date,
              public projetId?: number,
              public detailLoyer?: DetailLoyer[]) {
  }
}
