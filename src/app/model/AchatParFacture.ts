import {DetailAchatTravaux} from './DtailAchat';

export class AchatParFacture {

constructor(public id?: number,
            public version?: number,
            public numeroFacture?: string,
            public libelle?: string,
            public montant?: number,
            public quantite?: number,
            public total?: number,
            public date?: Date,
            public projetId?: number,
            public detailAchatTravaux?: DetailAchatTravaux[]) {
}
}
