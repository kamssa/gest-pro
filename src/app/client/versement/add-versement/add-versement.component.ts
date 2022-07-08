import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../../../model/Client';
import {Travaux} from '../../../model/travaux';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Versement} from '../../../model/Versement';
import {DetailVersement} from '../../../model/DetailVersement';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {VersementService} from '../../../service/versement.service';
import {DetailVersementService} from '../../../service/detailVersement.service';
import {Transport} from '../../../model/Transport';

@Component({
  selector: 'app-add-versement',
  templateUrl: './add-versement.component.html',
  styleUrls: ['./add-versement.component.scss']
})
export class AddVersementComponent implements OnInit {
  versementForm: FormGroup;
  detailVersementInit: any;
  versement: Versement;
  travaux: Travaux;
  detailVersement: DetailVersement;
  id: number;
  editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Travaux,
              private  fb: FormBuilder,
              public dialogRef: MatDialogRef<AddVersementComponent>,
              private steTravauxService: SteTravauxService,
              private versementService: VersementService) {
  }

  ngOnInit(): void {

    if(this.data['travaux']){
      this.steTravauxService.getTravauxById(this.data['travaux'])
        .subscribe(res => {
          this.travaux = res.body;
        });
          this.versementService.getVersementByTravaux(this.data['travaux'])
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
                  trauvaux: this.travaux,
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
    trauvaux: '',
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
      this.travaux);
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
