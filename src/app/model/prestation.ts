import {Entreprise} from './Entreprise';
import {Vehicule} from './vehicule';
import {StationEssence} from './stationEssence';

export class Prestation {
  constructor(
    public id?: number,
    public version?: number,
    public date?: Date,
    public libelle?: string,
    public nomChauffeur?: string,
    public   prixUnitaire?: number,
    public  quantite?: number,
    public  total?: number,
    public vehicule?: Vehicule,
    public  stationEssence?: StationEssence,
    public entreprise?: Entreprise,

) {
  }
}
