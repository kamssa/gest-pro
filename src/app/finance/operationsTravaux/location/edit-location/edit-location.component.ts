import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {filter, map, switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {CumulDepensesComponent} from '../../cumul-depenses/cumul-depenses.component';
import {Projet} from '../../../../model/projet';
import {ProjetService} from '../../../../service/projet.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  name: any;
  id: number;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  projet: Projet;
  projetId: number;
  solde: number;
  total: number;
  panelOpenState = false;
  constructor(private route: ActivatedRoute,
              private projetService: ProjetService, private  router: Router,
              private mediaObserver: MediaObserver,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.refreshData();
    setInterval(() => {
      this.refreshData();
    }, 3000);
    //this.refreshData();
  }
  refreshData(){
    this.mediaSub = this.mediaObserver.asObservable() // New Way asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      ).subscribe((change: MediaChange) => {
          this.devicesXs = change.mqAlias === 'xs' ? true : false;
        }
      );
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projetService.getProjetById(+params.get('id')))
    ).subscribe(result => {
      this.projet = result.body;
      this.projetId = result.body.id;
      console.log(result.body);
    });
  }

  getTravauxById() {
    this.projetService.getProjetById(this.id).subscribe(res => {
      this.projet = res.body;
    });
  }

  location() {
    this.edit = 0;
  }

  onCumulDepense(id: number) {
    console.log(id);
    this.dialog.open(CumulDepensesComponent,{
      data: {
        projet: id
      }
    });

  }
}
