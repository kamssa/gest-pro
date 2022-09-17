import {Entreprise} from './Entreprise';

export class Vehicule {
  constructor(public  id?: number,
              public  version?: number,
              public  chauffeur?: string,
              public  matriculation?: string,
              public  couleur?: string,
              public  marque?: string,
              public entreprise?: Entreprise,
              ) {
  }
}
