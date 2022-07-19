import {DetailTransport} from './DetailTransport';

export class Transport {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public montant?: number,
              public date?: Date,
              public projetId?: number,
              public detailTransport?: DetailTransport[]) {
  }
}
