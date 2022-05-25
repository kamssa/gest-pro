import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recherche-par-date',
  templateUrl: './recherche-par-date.component.html',
  styleUrls: ['./recherche-par-date.component.scss']
})
export class RechercheParDateComponent implements OnInit {
  roomsFilter: Date;
  roomsFilter1: Date;
  constructor() { }

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
}
