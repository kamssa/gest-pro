import {Entreprise} from './Entreprise';

export  class Site {

  constructor(
    public id?: number,
    public version?: number,
    public nomChantier?: string,
    public description?: string,
    public entreprise?: Entreprise) {
  }
}
