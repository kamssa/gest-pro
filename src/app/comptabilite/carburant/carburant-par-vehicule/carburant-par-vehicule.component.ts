import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicule} from '../../../model/vehicule';

import {MAT_DIALOG_DATA, MatDialog,} from '@angular/material/dialog';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CarburantService} from '../../../service/carburant.service';

@Component({
  selector: 'app-carburant-par-vehicule',
  templateUrl: './carburant-par-vehicule.component.html',
  styleUrls: ['./carburant-par-vehicule.component.scss']
})
export class CarburantParVehiculeComponent implements OnInit {
  vehicule: Vehicule;
  dateDebut: Date;
  dateFin: Date;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private helper: JwtHelperService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  carburantService: CarburantService
             )
  {

  }
  ngOnInit(): void {
    const id = this.data.vehicule.id;
    const dateDebut = this.data.dateDebut;
    const dateFin = this.data.dateFin;
    console.log(id);
    console.log(dateDebut );
    console.log( dateFin );
    this.carburantService.getCarburantByDateVehicule(id, dateDebut, dateFin)
      .subscribe(data => {
       console.log(data);
      });

  }

  onSearchClear() {
  }



  onEdit(row: any) {

  }

  onDelete(row: any) {

  }

  applyFilter(event: Event) {


  }
}
