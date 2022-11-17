import {Entreprise} from './Entreprise';

export class StationEssence {
  constructor(
    public id?: number,
    public version?: number,
    public libelle?: string,
    public solde?: number,
    public entreprise?: Entreprise,
  ) {
  }
}
