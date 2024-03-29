import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {GetAllDepartementByEntrepriseAction} from '../ngrx-dep/dep.actions';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DepService} from '../../service/dep.service';
import {AddDepComponent} from '../add-dep/add-dep.component';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dep-nav-bar',
  templateUrl: './dep-nav-bar.component.html',
  styleUrls: ['./dep-nav-bar.component.scss']
})
export class DepNavBarComponent implements OnInit {
personne: any;
id: number;
entreprise: any;
  form: FormGroup;
  constructor(  private router: Router,
                private store: Store<any>,
                private authService: AuthService,
                private helper: JwtHelperService,
                public dialog: MatDialog,
                private depService: DepService) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const token = currentUser.body.body.accessToken;
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'ENTREPRISE') {
          this.id = this.personne.id;
          this.entreprise = this.personne;

        }else if (this.personne.type === 'EMPLOYE'){
          this.id = this.personne.departement.entreprise.id;
          this.entreprise = this.personne.departement.entreprise;

        }
      });
    }

  }


  onSearch(dataForm: any) {
/*
    this.store.dispatch(new SearchDepartementAction(dataForm.keyword, this.entreprise.nom));
*/

  }

  addDep() {
    this.depService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddDepComponent, {
      data: {
        entreprise: this.entreprise
      }

    });


  }

  openListDep() {
    this.store.dispatch(new GetAllDepartementByEntrepriseAction(this.id));
    this.router.navigate(['dep/listDepartement']);
  }
}
