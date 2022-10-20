import {DetailAutreAchatTravaux} from './DetailAutreAchatTravaux';

export class AutreAchatTravaux {
  constructor(public id?: number,
              public version?: number,
              public numeroFacture?: string,
              public libelle?: string,
              public montant?: number,
              public fournisseur?: number,
              public date?: Date,
              public projetId?: number,
              public detailAutreAchatTravaux?: DetailAutreAchatTravaux[]) {
  }
}
