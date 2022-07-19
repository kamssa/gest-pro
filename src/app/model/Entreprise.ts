import {Adresse} from './Adresse';
import {Personne} from './Personne';
import {Departement} from './Departement';

export class Entreprise extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public description ?: string,
              public logo ?: string,
              public nom ?: string,
              public email ?: string,
              public telephone?: string,
              public password ?: string,
              public nomComplet ?: string,
              public suspendu ?: boolean,
              public actevated ?: boolean,
              public adresse ?: Adresse,
              public  type?: string,
              public roles?: []) {
    // @ts-ignore
    super(id, version, nom, email, telephone, password, nomComplet, suspendu, actevated, adresse, type, roles);
  }

}
