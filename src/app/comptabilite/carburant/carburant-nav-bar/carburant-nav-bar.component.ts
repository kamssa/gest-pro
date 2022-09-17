import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RechercheParDateComponent} from '../../../finance/operationsTravaux/cumul-depenses/recherche-par-date/recherche-par-date.component';
import {RechercheCarburantParDateComponent} from '../recherche-carburant-par-date/recherche-carburant-par-date.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-carburant-nav-bar',
  templateUrl: './carburant-nav-bar.component.html',
  styleUrls: ['./carburant-nav-bar.component.scss']
})
export class CarburantNavBarComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openConsoVehicule() {

    this.dialog.open(RechercheCarburantParDateComponent);
  }

  onpenConsoEntreprise() {

  }

  addVehicule() {

  }

  openListVehicule() {
    this.router.navigate(['carburant/listVehiculeCarburant']);


  }

  onSearch(value: any) {

  }
}
