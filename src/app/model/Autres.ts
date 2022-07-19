import {DetailLoyer} from "./DetailLoyer";
import {DetailAutres} from "./DetailAutres";

export class Autres {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public montant?: number,
              public date?: Date,
              public projetId?: number,
              public detailAutres?: DetailAutres[]) {
  }
}
