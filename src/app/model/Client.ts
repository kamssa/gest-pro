import {Adresse} from './Adresse';
import {Personne} from './Personne';

export class Client extends Personne {
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public nom?: string,
              public prenom?: string,
              public email ?: string,
              public telephone?: string,
              public nomComplet?: string,
              public adresse?: Adresse,
              public actived?: boolean,
              public type?: string) {
    super(id, version, nom, prenom, telephone, nomComplet, type);
  }

}
