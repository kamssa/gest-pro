import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Employe} from '../../model/Employe';
import {EmployeService} from '../../service/employe.service';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DepService} from '../../service/dep.service';
import {Departement} from '../../model/Departement';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit {

  isLinear = false;
  checked = false;
  employeForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode: any;
  error = '';
  checkbox = false;
  employe: Employe;
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  departements: Departement[];
  departement: Departement;
  userRoles: string [] = [];

  constructor(public fb: FormBuilder,
              public  employeService: EmployeService,
              public authService: AuthService,
              private departementService: DepService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddEmployeComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              private  helper: JwtHelperService) {


  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      console.log(decoded.sub);
      this.employeService.getPersonneById(decoded.sub).subscribe(result => {
        this.personne = result.body;
        console.log(this.personne);
        this.roles = result.body.roles;
        // V??rifie si le tableau contient le droit de la personne retournn??e
        this.roles.forEach(val => {
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);

        });
        if (this.userRoles.includes('ROLE_ENTREPRISE')){
          this.departementService.getDepByIdEntreprise(this.personne.id).subscribe(res => {
            console.log(res);
            this.departements = res.body;
          }, error => {
          });
        }else if (this.userRoles.includes('ROLE_MANAGER') || this.userRoles.includes('ROLE_ADMINISTRATION')) {
          this.departementService.getDepByIdEntreprise(this.personne.departement.entreprise.id).subscribe(res => {
            console.log(res);
            this.departements = res.body;
            console.log(this.departements);
          }, error => {
            console.log(error.message);
          });
        }else {
          this.error ='Vous n\'etes pas autoris??';

        }
        }, error => {
        console.log(error.message);
      } );

    }


  }

  onSubmit(): void{

    if (!this.employeService.form.get('id').value){
      this.employe = {
        nom: this.employeService.form.value.nom,
        prenom: this.employeService.form.value.prenom,
        email: this.employeService.form.value.email,
        password: this.employeService.form.value.password,
        activated: this.employeService.form.value.activated,
        departement: this.departement,
        type:'EMPLOYE'
      };
      this.employeService.ajoutEmploye(this.employe).subscribe(res => {
        if(res.status === 0){
          this.notificationService.success('Employ?? ajout?? avec succ??s');
        }
      });
    } else {
      if(this.code === null || this.code === undefined){
        this.employe = {
          id:  this.employeService.form.value.id,
          version:  this.employeService.form.value.version,
          email: this.employeService.form.value.email,
          password: this.employeService.form.value.password,
          nom: this.employeService.form.value.nom,
          prenom: this.employeService.form.value.prenom,
          fonction: this.employeService.form.value.fonction,
          activated: this.employeService.form.value.activated,
          departement: this.departement,
          type:'EMPLOYE'
        };

      }else{
        this.employe = {
          id:  this.employeService.form.value.id,
          version:  this.employeService.form.value.version,
          nom: this.employeService.form.value.nom,
          prenom: this.employeService.form.value.prenom,
          email: this.employeService.form.value.email,
          password: this.employeService.form.value.password,
          activated: this.employeService.form.value.activated,
          departement: this.departement,
          type:'EMPLOYE'
        };

      }
      this.employeService.modifEmploye(this.employe).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Employ?? modifi?? avec succ??s');
        }
      });
      this.employeService.form.reset();
      this.employeService.initializeFormGroup();

    }
    this.onClose();

  }

  onClose() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
    this.notificationService.success('Champs r??initialis??s!');
  }
  onCountryChange(event: any) {
    console.log(event);
    // this.code = event.dialCode;
    console.log(this.code);
  }


  telInputObject(obj) {
   // this.initialCode = obj.s.dialCode;
    console.log(this.initialCode);
  }
  greetDep(event) {

    console.log('Voir le select', event.value);
    this.departementService.getDepartementById(event.value).subscribe(data => {
      this.departement = data.body;
      console.log('valeur de retour de ville', this.departement);
    });

  }
}
