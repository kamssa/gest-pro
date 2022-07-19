import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Site} from '../../../model/site';
import {EmployeService} from '../../../service/employe.service';
import {Projet} from '../../../model/projet';
import {ProjetService} from '../../../service/projet.service';

@Component({
  selector: 'app-add-travaux-site',
  templateUrl: './add-travaux-site.component.html',
  styleUrls: ['./add-travaux-site.component.scss']
})
export class AddTravauxSiteComponent implements OnInit {
  projet: Projet;
  projets: Projet[];
  tForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  personne: any;
  nav: boolean;
  site: Site;

  constructor(private projetService: ProjetService,
              private employeService: EmployeService,
              private  fb: FormBuilder, private  router: Router,
              @Inject(MAT_DIALOG_DATA) public data: Site,
              private snackBar: MatSnackBar, private helper: JwtHelperService,
              public dialogRef: MatDialogRef<AddTravauxSiteComponent>) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;

        if (this.personne.type === 'EMPLOYE') {
          this.employeService.getEmployeById(this.personne.id).subscribe(result => {
            this.personne = result.body;
            this.nav = true;
            // insert code
            this.projetService.getProjetById(this.data['site'])
              .subscribe(res => {
                console.log(res.body);
                this.site = res.body;
                this.tForm = this.fb.group({
                  libelle: new FormControl('', [Validators.required]),
                  numeroBon: new FormControl('', [Validators.required]),
                  accompte: new FormControl(''),
                  budget: new FormControl('', [Validators.required]),
                  date: new FormControl(''),
                  dateLivraison: new FormControl(''),
                  site: this.fb.group({
                    id: res.body.id,
                    version: res.body.version,
                    entreprise: this.personne.entreprise
                  }),
                  ville: this.fb.group({
                    nom: new FormControl(''),
                  }),
                  client: this.fb.group({
                    nom: new FormControl(''),
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
    this.projetService.ajoutProjet(this.projet).subscribe(data => {
      if (data) {
        console.log('voir travaux', this.projet);
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
}
