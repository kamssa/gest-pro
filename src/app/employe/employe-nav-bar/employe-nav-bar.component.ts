import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddVehiculeComponent} from '../../vehicule/add-vehicule/add-vehicule.component';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {VehiculeService} from '../../service/vehicule.service';
import {Store} from '@ngrx/store';
import {GetAllVehiculeByEntrepriseAction} from '../../vehicule/ngrx-vehicule/vehicule.actions';
import {GetAllEmpoyesByEntrepriseAction, GetSelectedEmpoyesAction} from '../ngrx-employe/employe.actions';
import {EmployeService} from '../../service/employe.service';
import {AddEmployeComponent} from '../add-employe/add-employe.component';
import {EmployePermitionComponent} from '../employe-permition/employe-permition.component';

@Component({
  selector: 'app-employe-nav-bar',
  templateUrl: './employe-nav-bar.component.html',
  styleUrls: ['./employe-nav-bar.component.scss']
})
export class EmployeNavBarComponent implements OnInit {
  entreprise: any;
  personne: any;
  constructor( public dialog: MatDialog,
               private authService: AuthService,
               private helper: JwtHelperService,
               private employeService: EmployeService,
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
        } else if (this.personne.type === 'EMPLOYE'){
          this.entreprise = this.personne.departement.entreprise;

        }
      });
    }
  }

  addEmplye() {
    this.employeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddEmployeComponent, {
      data: {
        entreprise: this.entreprise
      }

    });
  }

  openListEmploye() {
    this.store.dispatch(new GetAllEmpoyesByEntrepriseAction(this.entreprise.id));
    this.router.navigate(['userProfile/listEmploye']);

  }

  onSearch(value: any) {

  }

  selectedEmploye() {
   // this.store.dispatch(new GetSelectedEmpoyesAction(this.entreprise.id));

  }

}
