import {DetailMainOeuvre} from "./DetailMainDoeuvre";

export class MainOeuvre {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public montant?: number,
              public date?: Date,
              public projetId?: number,
              public detailMainOeuvre?: DetailMainOeuvre[]) {
  }
}
