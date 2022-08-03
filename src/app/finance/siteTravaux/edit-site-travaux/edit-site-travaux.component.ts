import {Component, HostBinding, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../../../service/shared/dialogs/success-dialog/success-dialog.component';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../helper/format-datepicker';
import {EmployeService} from '../../../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../../helper/notification.service';
import {Entreprise} from '../../../model/Entreprise';
import {ProjetService} from '../../../service/projet.service';
import {Projet} from '../../../model/projet';
import {EntrepriseService} from '../../../service/entreprise.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-edit-site-travaux',
  templateUrl: './edit-site-travaux.component.html',
  styleUrls: ['./edit-site-travaux.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class EditSiteTravauxComponent implements OnInit {
  createSiteForm: FormGroup;
  editMode: any;
  name: any;
  projet: Projet;
  @HostBinding('class.is-open')
  isOpen = false;
  title = 'la liste des sites';
  projets: Projet[] = [];
  edit: number;
  projetId: number;
  private dialogConfig;
  personne: any;
  nav: boolean;
  entreprise: Entreprise;
  ROLE_MANAGER: any;
  userRoles: string [] = [];
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  constructor(
    private  router: Router, private  fb: FormBuilder,
    private  projetService: ProjetService,
    private entrepriseService: EntrepriseService,
    private location: Location,   private notificationService: NotificationService,
    private dialog: MatDialog,
    private authService: AuthService,
    private  employeService: EmployeService,
    private helper: JwtHelperService) { }

  ngOnInit(): void {

    this.dialogConfig = {
      height: '200px',
       width: '400px',
      disableClose: true,
      data: { }
    };
    const token = localStorage.getItem('currentUser');
    if(token){
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);
        });
        if ( this.userRoles.includes('ROLE_EMPLOYE') ||  this.userRoles.includes('ROLE_ACHAT') || this.userRoles.includes('ROLE_ADMINISTRATION')){
         this.entrepriseService.getEntrepriseById(this.personne.departement.entreprise.id)
           .subscribe(data => {
             this.entreprise = data.body;
             console.log(this.entreprise);
             if (res.status === 0){
               this.createSiteForm = this.fb.group({
                 libelle: new FormControl('', [Validators.required]),
                 description: new FormControl('', [Validators.required]),
                 numeroBon: new FormControl('', [Validators.required]),
                 accompte: new FormControl(''),
                 budget: new FormControl('', [Validators.required]),
                 date: new FormControl('' ),
                 dateLivraison: new FormControl('' ),
                 entreprise: this.entreprise,
                 client: this.fb.group({
                   nom: [''],
                   type:'CLIENT'
                 }),
                 ville:  this.fb.array([]) ,
                 situationGeographique:  this.fb.array([]) ,

               });

             }
           });



        }
      });
    }else {
      console.log("pas de token");
    }

  }
  initForm(): void {

    }
  get ville(): FormArray {
    return this.createSiteForm.get('ville') as FormArray;
  }
  get formArr() {
    return this.createSiteForm.get('ville') as FormArray;
  }
  newVille(): FormGroup {
    return this.fb.group({
      nom: '',
      description: '',
    });
  }

  addVille() {
    this.ville.push(this.newVille());
  }

  removeVille(i: number) {
    this.ville.removeAt(i);
  }
  get situationGeographique(): FormArray {
    return this.createSiteForm.get("situationGeographique") as FormArray;
  }
  newSituationGeographique(): FormGroup {
    return this.fb.group({
      libelle: '',
    });
  }

  addSituationGeographique() {
    this.situationGeographique.push(this.newSituationGeographique());
  }

  removeSituationGeographique(i:number) {
    this.situationGeographique.removeAt(i);
  }
  public hasError = (controlName: string, errorName: string) => {
    //return this.createSiteForm.controls[controlName].hasError(errorName);
  }
  public createSiteChantier = (createSiteFormValue) => {
    if (this.createSiteForm.valid) {
      this.onSubmit(createSiteFormValue);
    }
  }
  onSubmit(createSiteFormValue): void {

     console.log(this.createSiteForm.value);
     this.projetService.ajoutProjet(this.createSiteForm.value).subscribe(data => {
           if(data.status === 0){
             this.projet = data.body;
             this.projetId = data.body.id;
             let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
             dialogRef.afterClosed()
               .subscribe(result => {
                 this.router.navigate(['finance']);
               });

           }else {
             this.notificationService.warn(data.messages);
           }

         }, error => {
           this.location.back();
         });


  }
  achat() {
    this.edit = 0;
  }

  salaire() {
    this.edit = 1;
  }

  loyer() {
    this.edit = 4;
  }

  ouvre() {
    this.edit = 3;
  }

  transport() {
    this.edit = 5;
  }

  autre() {
    this.edit = 6;
  }

  /*location() {
    this.edit = 2;
  }*/

  public onCancel = () => {
    this.location.back();
  }
}
