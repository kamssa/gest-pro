import {DetailAchatTravaux} from './DtailAchat';

export class AchatTravaux {

constructor(public id?: number,
            public version?: number,
            public libelle?: string,
            public date?: Date,
            public montant?: number,
            public projetId?: number,
            public detailAchatTravaux?: DetailAchatTravaux[]) {
}
}
