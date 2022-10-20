import {Categorie} from './Categorie';

export class Materiaux {
  constructor(public id?: number,
              public version?: number,
              public  libelle?: string,
              public  description?: string,
              public unite?: string,
              public selected?: boolean,
              public categorie?: Categorie) {
  }
}
