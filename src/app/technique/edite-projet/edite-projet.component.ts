import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {Projet} from '../../model/projet';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Entreprise} from '../../model/Entreprise';
import {ProjetService} from '../../service/projet.service';
import {Router} from '@angular/router';
import {EmployeService} from '../../service/employe.service';
import {AuthService} from '../../service/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EntrepriseService} from '../../service/entreprise.service';
import {Location} from '@angular/common';
import {NotificationService} from '../../helper/notification.service';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-edite-projet',
  templateUrl: './edite-projet.component.html',
  styleUrls: ['./edite-projet.component.scss']
})
export class EditeProjetComponent implements OnInit {
  modifProjetForm: FormGroup;
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private  router: Router, private  fb: FormBuilder,
    private  projetService: ProjetService,
    private entrepriseService: EntrepriseService,
    private location: Location,   private notificationService: NotificationService,
    private dialog: MatDialog,
    private authService: AuthService,
    private  employeService: EmployeService,
    @Inject(MAT_DIALOG_DATA) public data: Projet,
    private snackBar: MatSnackBar,  private helper: JwtHelperService,
    public dialogRef: MatDialogRef<EditeProjetComponent>) { }

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
              if (res.status === 0){
                // insert code
                this.projetService.getProjetById(this.data['projet'])
                  .subscribe(result => {
                    console.log(result.body);
                    this.projet = result.body;
                    this.modifProjetForm = this.fb.group({
                      id: this.projet.id,
                      version: this.projet.version ,
                      libelle: this.projet.libelle,
                      description: this.projet.description,
                      numeroBon: this.projet.numeroBon,
                      montantFacture: this.projet.montantFacture,
                      accompte: this.projet.accompte,
                      reste: this.projet.reste,
                      total: this.projet.total,
                      percent: this.projet.percent,
                      debousserSec: this.projet.debousserSec,
                      date: this.projet.date,
                      dateLivraison: this.projet.dateLivraison,
                      entreprise: this.entreprise,
                      client: this.fb.group({
                        id: this.projet.client.id,
                        version: this.projet.client.version,
                        libelle: this.projet.client.libelle,
                        nom: this.projet.client.nom,
                        prenom: this.projet.client.prenom,
                        type: 'CLIENT'
                      }),
                    });
                  });
                // end insert code

              }
            });



        }
      });
    }else {
      console.log("pas de token");
    }

  }

  onSubmit() {
    this.projet = this.modifProjetForm.value;
    console.log(this.projet);
    this.projetService.modifierProjet(this.projet).subscribe(data => {
      if (data){
        console.log(data.body);
        this.projet = data.body;
        this.dialogRef.close(this.projet);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    //  this.router.navigate(['terrainAGEO']);
    this.dialogRef.close();
  }

  onCancel() {

  }
}
