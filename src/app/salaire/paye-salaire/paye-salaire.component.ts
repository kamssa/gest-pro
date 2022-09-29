import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employe} from '../../model/Employe';
import {EmployeService} from '../../service/employe.service';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {DetailSalaire} from '../../model/DetailSalaire';
import {DetailSalaireService} from '../../service/detail-salaire.service';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-paye-salaire',
  templateUrl: './paye-salaire.component.html',
  styleUrls: ['./paye-salaire.component.scss']
})
export class PayeSalaireComponent implements OnInit {
  detailSalaireForm: FormGroup;
  detailSalaire: DetailSalaire;
  detailSalaireId: number;
  employeId: number;
  employes: Employe[];
  private dialogConfig;
  entreprise: any;
  personne: any;
  constructor(public fb: FormBuilder,
              private  detailSalaireService: DetailSalaireService,
              private  employeService: EmployeService,
              private location: Location,
              private dialog: MatDialog,
              private authService: AuthService,
              private helper: JwtHelperService) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const token = currentUser.body.body.accessToken;
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'ENTREPRISE') {
          this.entreprise = this.personne;

        }else if (this.personne.type === 'EMPLOYE'){
          this.entreprise = this.personne.departement.entreprise;

        }
      });
    }
    this.employeService.getEmployeByIdEntreprise(this.entreprise.id).subscribe(result => {
      console.log(result.body);
      this.employes = result.body;
    });
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }
  initForm() {
    this.detailSalaireForm = this.fb.group({
      date: new FormControl('' ),
      libelle: new FormControl('', [Validators.required]),
      montantVerse: new FormControl('', [Validators.required]),
      employeId: new FormControl('', [Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.detailSalaireForm.controls[controlName].hasError(errorName);
  }
  public createDetailSalaire = (createDetailSalaireFormValue) => {
    console.log('voir info', this.detailSalaireForm.value);
    if (this.detailSalaireForm.valid) {
     // console.log('voir info', this.detailSalaireForm.value);
      this.onSubmit(createDetailSalaireFormValue);
    }
  }

  onSubmit(createDetailSalaireFormValue): void{
    console.log('voir les valeurs assignés', createDetailSalaireFormValue.value);
    let  detailSalaire : DetailSalaire = {
      date: createDetailSalaireFormValue.date,
      libelle: createDetailSalaireFormValue.libelle,
      montantVerse: createDetailSalaireFormValue.montantVerse,
      employeId: createDetailSalaireFormValue.employeId
    };

    this.detailSalaireService.ajoutDetailSalaire(detailSalaire).subscribe(data => {
      console.log('detail salaire', data.body);
      this.detailSalaire = data.body;
      this.detailSalaireId = data.body.id;
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {
          // this.router.navigate(['finance']);
        });

    }, error => {
      this.location.back();
      this.detailSalaireForm.reset();
    });
  }

}
