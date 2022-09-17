import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Banque} from '../../../model/Banque';
import {DialogMainouvreComponent} from '../../../finance/operationsTravaux/mainouvre/dialog-mainouvre/dialog-mainouvre.component';

@Component({
  selector: 'app-add-retrait',
  templateUrl: './add-retrait.component.html',
  styleUrls: ['./add-retrait.component.scss']
})
export class AddRetraitComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: Banque,
               public dialogRef: MatDialogRef<AddRetraitComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data.id);
  }

}
