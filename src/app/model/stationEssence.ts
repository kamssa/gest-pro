import {Entreprise} from './Entreprise';
import {PrestationStation} from './PrestationStation';

export class StationEssence {
  constructor(
    public id?: number,
    public version?: number,
    public nom?: string,
    public vidange?: number,
    public prixSuper?: number,
    public prixGazoil?: number,
    public prixHuileMoteur?: number,
    public prestationStation?: PrestationStation,
    public entreprise?: Entreprise,
  ) {
  }
}
