import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Travaux} from '../../../../model/travaux';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {AutreAchatTravauxService} from '../../../../service/autre-achat-travaux.service';
import {DatePipe} from '@angular/common';
import {EditAutreAchatTravauxComponent} from '../../autreAchatTravaux/edit-autre-achat-travaux/edit-autre-achat-travaux.component';
import {CumulParDateComponent} from '../../cumul-par-date/cumul-par-date.component';
import {AutreAchatTravaux} from '../../../../model/AutreAchatTravaux';

@Component({
  selector: 'app-recherche-par-date',
  templateUrl: './recherche-par-date.component.html',
  styleUrls: ['./recherche-par-date.component.scss']
})
export class RechercheParDateComponent implements OnInit {
  roomsFilter: any;
  roomsFilter1: any;
  model: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Travaux,
              public datepipe: DatePipe,
              public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  onChange($event){
    console.log($event.target.value);
  }

  dateChange($event: any) {
    console.log($event.target.value);
    this.roomsFilter = $event.target.value;
    console.log(this.roomsFilter);
  }

  dateChange1($event: any) {
    console.log($event.target.value);
    this.roomsFilter1 = $event.target.value;
    console.log(this.roomsFilter1);
  }

  submit() {
    console.log("date 1",this.roomsFilter);
    console.log("date 2", this.roomsFilter1);
    const id = this.data['travaux'];
    const dateDebut = this.datepipe.transform(this.roomsFilter, 'yyyy-MM-dd');
    const dateFin = this.datepipe.transform(this.roomsFilter1, 'yyyy-MM-dd');

    console.log("dateDebut", dateDebut);
    console.log("dateFin", dateFin);

    this.dialog.open(CumulParDateComponent, {
       data: {
           id: id,
           dateDebut: dateDebut,
           dateFin: dateFin
       }
    });
  }
}
