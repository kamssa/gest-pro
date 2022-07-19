import {DetailLocation} from "./DetailLocation";

export  class LocationTravaux {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public date?: Date,
              public projetId?: number,
              public detailLocation?: DetailLocation[]) {
  }
}
