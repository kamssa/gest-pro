import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recherche-carburant-par-date',
  templateUrl: './recherche-carburant-par-date.component.html',
  styleUrls: ['./recherche-carburant-par-date.component.scss']
})
export class RechercheCarburantParDateComponent implements OnInit {
  selectedValue: any;
  foods: any;


  constructor() { }

  ngOnInit(): void {
  }

  submit() {

  }

  dateChange($event: any) {

  }

  dateChange1($event: any) {

  }
}
