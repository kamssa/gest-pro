import {Adresse} from "./Adresse";
import {Personne} from "./Personne";
import {Departement} from "./Departement";
import {Salaire} from './Salaire';

export class Employe extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public nom ?: string,
              public prenom ?: string,
              public email ?: string,
              public telephone?: string,
              public password ?: string,
              public fonction ?: string,
              public nomComplet ?: string,
              public suspendu ?: boolean,
              public actevated ?: boolean,
              public departement?: Departement,
              public adresse ?: Adresse,
              public  type?: string,
              public roles?: [],

              public  salaire?: Salaire) {
    super(id, version, nom, prenom, email, telephone, password, fonction, nomComplet, suspendu, actevated,  departement, adresse, type, roles);
  }


}
