import {Component, Inject, OnInit} from '@angular/core';
import {Vehicule} from '../../../model/vehicule';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CarburantService} from '../../../service/carburant.service';

@Component({
  selector: 'app-carburant-par-vehicule-mois',
  templateUrl: './carburant-par-vehicule-mois.component.html',
  styleUrls: ['./carburant-par-vehicule-mois.component.scss']
})
export class CarburantParVehiculeMoisComponent implements OnInit {
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
    const vehicule = this.data.vehicule;
    console.log('vehicule mois', vehicule);
   /* this.carburantService.getCarburantByDateVehicule(id, dateDebut, dateFin)
      .subscribe(data => {
        console.log(data);
      });*/

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
