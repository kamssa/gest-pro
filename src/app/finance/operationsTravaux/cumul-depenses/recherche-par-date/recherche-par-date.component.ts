import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Travaux} from '../../../../model/travaux';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';

@Component({
  selector: 'app-recherche-par-date',
  templateUrl: './recherche-par-date.component.html',
  styleUrls: ['./recherche-par-date.component.scss']
})
export class RechercheParDateComponent implements OnInit {
  roomsFilter: Date;
  roomsFilter1: Date;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Travaux,
              private achatTravauxService: AchatTravauxService) { }

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
    console.log(this.roomsFilter);
    console.log(this.roomsFilter1);
    this.achatTravauxService.getDetailAchatTravauxByDateTravaux(this.data['travaux'],this.roomsFilter, this.roomsFilter1)
      .subscribe(res => {
      console.log('recherche par date', res);
      });
  }
}
