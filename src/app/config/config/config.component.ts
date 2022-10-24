import { Component, OnInit } from '@angular/core';
import {AddBanqueComponent} from '../../banque/banque/add-banque/add-banque.component';
import {MatDialog} from '@angular/material/dialog';
import {AddStaionEssenceComponent} from '../../stationEssence/add-staion-essence/add-staion-essence.component';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ListCategorieComponent} from '../../categorie/list-categorie/list-categorie.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  isLinear: any;
  panelOpenState = false;
  entreprise: any;
  personne: any;

  constructor(private dialog: MatDialog,
              private authService: AuthService,

              private helper: JwtHelperService) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const token = currentUser.body.body.accessToken;
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'ENTREPRISE') {
          this.entreprise = this.personne;

        } else if (this.personne.type === 'EMPLOYE') {
          this.entreprise = this.personne.departement.entreprise;

        }
      });
    }
  }

  showNotification(bottom: string, right: string) {

  }

  addBanque() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      data: {
        entreprise: this.entreprise
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  addStation() {
    console.log('Dans config', this.entreprise);
    const dialogRef = this.dialog.open(AddStaionEssenceComponent,{
      data: {
        entreprise: this.entreprise
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  listCategorie() {
    console.log('Dans config', this.entreprise);
    const dialogRef = this.dialog.open(ListCategorieComponent,{
      /*data: {
        entreprise: this.entreprise
      }
*/
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
