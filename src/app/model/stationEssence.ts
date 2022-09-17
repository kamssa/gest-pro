import {Entreprise} from './Entreprise';

export class StationEssence {
  constructor(
    public id?: number,
    public version?: number,
    public nom?: string,
    public entreprise?: Entreprise
  ) {
  }
}
