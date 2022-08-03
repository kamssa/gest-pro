import { Component, OnInit } from '@angular/core';
import {Operation} from '../model/OperationBanque';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OperationBanqueService} from '../service/operationBanque.service';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../service/shared/dialogs/success-dialog/success-dialog.component';
import {Router} from '@angular/router';
import {AddBanqueComponent} from './add-banque/add-banque.component';
import {EmployeService} from '../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit {
  banqueForm: FormGroup;
  libelles: any[] = ['retrait', 'versement', 'virement'];
  banques: any[] = ['BOA', 'Banque altantique', 'NSIA'];
  private dialogConfig;
  edit = 0;
  userRoles: string [] = [];
  roles: any;
  ROLE_NAME: any;
  error = '';
  personne: any;
  editer: boolean;
  constructor(private fb: FormBuilder, private operationService: OperationBanqueService,
              private dialog: MatDialog, private router: Router,
              private authService: AuthService,
              private employeService: EmployeService,  private helper: JwtHelperService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        console.log('Voir la personne ', this.personne);
        this.roles = resultat.body.roles;
        // Vérifie si le tableau contient le droit de la personne retournnée
        this.roles.forEach(val => {
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);
        });
        if (this.userRoles.includes('ROLE_COMPTABILITE') || this.userRoles.includes('ROLE_ADMINISTRATION') ){
          this.editer = true;
          this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: { }
          };
          this.banqueForm = this.fb.group({
            date: new Date(),
            libelle: '',
            montant: '',
            motif: '',
            banque: this.fb.group({
              nom: ''
            })
          });
        }else {
          this.error ='Vous n\'etes pas autorisé';
          this.editer = false;
        }

      });
    }

  }
  onSubmit(banqueFormValue){
    console.log(this.banqueForm.value);
    let  operation: Operation = {
      date: banqueFormValue.date,
      libelle: banqueFormValue.libelle,
      montant: banqueFormValue.montant,
      motif: banqueFormValue.motif,
      banque: banqueFormValue.banque
    };
    this.operationService.ajoutOperation(operation).subscribe(data => {
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {

        });
    });
  }

  retrait() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }
  versement() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  banque() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  virement() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openRetrait() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openVersement() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openVirement() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}

