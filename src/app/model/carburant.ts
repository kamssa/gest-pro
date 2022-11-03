import {Entreprise} from './Entreprise';
import {CaisseDetail} from './CaisseDetail';
import {Vehicule} from './vehicule';
import {StationEssence} from './stationEssence';

export class Carburant {
  constructor(
    public id?: number,
    public version?: number,
    public date?: Date,
    public nomChauffeur?: string,
    public typeCarburant?: string,
    public   prixUnitaire?: number,
    public  quantite?: number,
    public  total?: number,
    public vehicule?: Vehicule,
    public  stationEssence?: StationEssence,
    public entreprise?: Entreprise,

) {
  }
}
