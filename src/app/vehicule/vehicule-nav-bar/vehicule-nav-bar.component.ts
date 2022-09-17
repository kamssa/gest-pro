import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddVehiculeComponent} from '../add-vehicule/add-vehicule.component';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import {GetAllVehiculeByEntrepriseAction} from '../ngrx-vehicule/vehicule.actions';
import {Router} from '@angular/router';
import {VehiculeService} from '../../service/vehicule.service';

@Component({
  selector: 'app-vehicule-nav-bar',
  templateUrl: './vehicule-nav-bar.component.html',
  styleUrls: ['./vehicule-nav-bar.component.scss']
})
export class VehiculeNavBarComponent implements OnInit {
  entreprise: any;
  personne: any;
  constructor( public dialog: MatDialog,
               private authService: AuthService,
               private helper: JwtHelperService,
               private vehiculeService: VehiculeService,
               private router: Router,
               private store: Store<any>) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const token = currentUser.body.body.accessToken;
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'ENTREPRISE') {
          this.entreprise = this.personne;
          this.store.dispatch(new GetAllVehiculeByEntrepriseAction(this.entreprise.id));


        } else if (this.personne.type === 'EMPLOYE'){
          this.entreprise = this.personne.departement.entreprise;
          this.store.dispatch(new GetAllVehiculeByEntrepriseAction(this.entreprise.id));


        }
      });
    }
  }
  addVehicule() {
    this.vehiculeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddVehiculeComponent, {
      data: {
        entreprise: this.entreprise
      }

    });

  }
  openListVehicule() {
    this.router.navigate(['vehicule/listVehicule']);


  }
  onCreate() {

  }

  onSearch(value: any) {

  }

  removeColumn() {

  }


  addCrburant() {

  }

  openListCarburant() {
  this.router.navigate(['vehicule/listCarburant']);
  }

  openConsoVehicule() {

  }

  onpenConsoEntreprise() {

  }
}
