import {Ville} from './Ville';
import {Client} from './Client';
import {Entreprise} from './Entreprise';
import {SituationGeographique} from './SituationGeographique';

export class Projet {
  constructor(public  id?: number,
              public  version?: number,
              public  libelle?: string,
              public  description?: string,
              public  numeroBon?: string,
              public  numeroPojet?: string,
              public  montantFacture?: number,
              public  accompte?: number,
              public  reste?: number,
              public  total?: number,
              public  debousserSec?: number,
              public percent?: number,
              public  date?: Date,
              public  dateLivraison?: Date,
              public entreprise?: Entreprise,
              public client?: Client,
              public ville?: Ville[],
              public situationGeographique?: SituationGeographique[]) {
  }
}
