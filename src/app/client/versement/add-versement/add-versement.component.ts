import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../../../model/Client';
import {Travaux} from '../../../model/travaux';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Versement} from '../../../model/Versement';
import {DetailVersement} from '../../../model/DetailVersement';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {VersementService} from '../../../service/versement.service';

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
  constructor( @Inject(MAT_DIALOG_DATA) public data: Travaux,
               private  fb: FormBuilder, public dialogRef: MatDialogRef<AddVersementComponent>,
               private steTravauxService: SteTravauxService,
               private versementService: VersementService) { }

  ngOnInit(): void {
    this.steTravauxService.getTravauxById( this.data['travaux'])
      .subscribe(res => {
        this.travaux = res.body;
        this.versementForm = this.fb.group({
          id: [''],
          version: [''],
          date: [''],
          montantVerse: [''],
          travaux: res.body,
      });

  });
  }

  onSubmit() {
    console.log(this.versementForm.value);
    this.versementService.ajoutDetailVersement(this.versementForm.value)
      .subscribe(data => {
        console.log(data);
      });
  }
  onClose() {
    this.dialogRef.close();
  }
}
