import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Versement} from '../../../model/Versement';
import {DetailVersement} from '../../../model/DetailVersement';
import {VersementService} from '../../../service/versement.service';
import {Projet} from '../../../model/projet';
import {ProjetService} from '../../../service/projet.service';

@Component({
  selector: 'app-add-versement',
  templateUrl: './add-versement.component.html',
  styleUrls: ['./add-versement.component.scss']
})
export class AddVersementComponent implements OnInit {
  versementForm: FormGroup;
  detailVersementInit: any;
  versement: Versement;
  projet: Projet;
  detailVersement: DetailVersement;
  id: number;
  editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Projet,
              private  fb: FormBuilder,
              public dialogRef: MatDialogRef<AddVersementComponent>,
              private projetService: ProjetService,
              private versementService: VersementService) {
  }

  ngOnInit(): void {

    if(this.data['projet']){
      this.projetService.getProjetById(this.data['projet'])
        .subscribe(res => {
          this.projet = res.body;
        });
          this.versementService.getVersementByTravaux(this.data['projet'])
            .subscribe(result => {
              console.log('Voir la modif', result);
              if (result.status === 0) {
                this.versement = result.body;
                this.versementForm = this.fb.group({
                  id: '',
                  version: '',
                  date: '',
                  solde: '',
                  reste: '',
                  projet: this.projet,
                  detailVersement: this.fb.array([this.initItemRows()])
                });

              } else {
                this.initForm();
            }
            });


    }
  }
initForm() {
  this.versementForm = this.fb.group({
    id: '',
    version: '',
    date: '',
    solde: '',
    reste: '',
    projet: '',
    detailVersement: this.fb.array([this.initItemRows()])
  });

}

get formArr() {
  return this.versementForm.get('detailVersement') as FormArray;
}

initItemRows() {
  return this.fb.group({
    id: [''],
    version: [''],
    date: ['', Validators.required],
    montantVerse: ['', Validators.required],
  });
}
  onSubmit() {
    let formValue = this.versementForm.value;
    console.log(formValue['detailVersement']);
    // console.log(formValue.itemsRows);
    let versement = new Versement(
      null,
      null,
      null,
      null,
      null,
      formValue['detailVersement'],
      this.projet);
    console.log(versement);
    this.versementService.ajoutVersement(versement)
      .subscribe(data => {
        console.log(data);
      });
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }
}
