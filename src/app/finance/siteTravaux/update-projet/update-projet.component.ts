import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../../service/employe.service';
import {Projet} from '../../../model/projet';
import {ProjetService} from '../../../service/projet.service';
import {Entreprise} from '../../../model/Entreprise';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrls: ['./update-projet.component.scss']
})
export class UpdateProjetComponent implements OnInit {
  projet: Projet;
  projets: Projet[];
  tForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  personne: any;
  nav: boolean;
  entreprise: Entreprise;
  constructor(
    private projetService: ProjetService,
    private  fb: FormBuilder, private  router: Router,
    private employeService: EmployeService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Projet,
    private snackBar: MatSnackBar,  private helper: JwtHelperService,
    public dialogRef: MatDialogRef<UpdateProjetComponent>) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;

        if (this.personne.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.entreprise = result.body.departement.entreprise;
            this.nav = true;
        // insert code
            this.projetService.getProjetById(this.data['projet'])
              .subscribe(res => {
                console.log(res.body);
                this.projet = res.body;
                this.tForm = this.fb.group({
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
          });

        }

      });
    }


  }

  onSubmit() {
     this.projet = this.tForm.value;
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
  onClose() {

    this.dialogRef.close();
  }
}
