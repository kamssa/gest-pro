import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {DepService} from '../../service/dep.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NotificationService} from '../../helper/notification.service';
import {Location} from '@angular/common';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../service/employe.service';
import {Entreprise} from '../../model/Entreprise';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.scss']
})
export class AddDepComponent implements OnInit {
  depForm: FormGroup;
  departement: Departement;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;
  entreprise: Entreprise;
  error = '';
  personne: any;
  array: any;
  userRoles: string [] = [];

  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  constructor(public fb: FormBuilder,
              public departementService: DepService,
              private location: Location,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddDepComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document,
              public employeService: EmployeService) {
    const token = localStorage.getItem('currentUser');
    if(token){
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);
        });
        if (this.userRoles.includes('ROLE_ENTREPRISE')){
          this.entreprise = res.body;

        }else if ( this.userRoles.includes('ROLE_MANAGER') || this.userRoles.includes('ROLE_ADMINISTRATION')){

          this.personne = res.body;
          this.entreprise = res.body.departement.entreprise;

        }else {
        console.log('Nothing');
        }
      });
    }else {
      console.log("pas de token");
    }
  }




  ngOnInit(): void {

  }

  onSubmit(): void{
    if (!this.departementService.form.get('id').value){
      this.departement = {
        libelle: this.departementService.form.value.libelle,
        description: this.departementService.form.value.description,
        entreprise: this.entreprise
      };
      this.departementService.ajoutDepartement(this.departement).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Departement ajouté avec succès');
        }
      });

    }
    else{
      this.departement = {
        id: this.departementService.form.value.id,
        version: this.departementService.form.value.version,
        libelle: this.departementService.form.value.libelle,
        description: this.departementService.form.value.description,
        entreprise: this.entreprise
      };
      console.log(this.departement);
      this.departementService.modifDepartement(this.departement).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Departement modifié avec succès');

        }
      });
      this.departementService.form.reset();
      this.departementService.initializeFormGroup();
    }
    this.onClose();


  }

  onClose() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }

}
