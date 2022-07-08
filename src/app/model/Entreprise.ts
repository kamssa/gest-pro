
export class Entreprise {
  constructor(public id?: number,
              public version?: number,
              public nom?: string,
              public description?: string,
              public suspendu?: boolean,
              public  lienFacebook?: string,
              public  lienLinkedIn?: string,
              public  lienTwitter?: string,
              public  lientInstagram?: string,
              public  logo?: string,
              public  siteWeb?: string) {
  }
}
