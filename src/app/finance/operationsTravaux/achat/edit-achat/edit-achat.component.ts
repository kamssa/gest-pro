import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {switchMap} from 'rxjs/operators';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {CumulDepensesComponent} from '../../cumul-depenses/cumul-depenses.component';
import {MatDialog} from '@angular/material/dialog';
import {Projet} from '../../../../model/projet';
import {ProjetService} from '../../../../service/projet.service';

@Component({
  selector: 'app-edit-achat',
  templateUrl: './edit-achat.component.html',
  styleUrls: ['./edit-achat.component.scss']
})
export class EditAchatComponent implements OnInit {
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
              public dialog: MatDialog,
              private achatService: AchatTravauxService) {

  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.devicesXs = result.mqAlias === 'xs' ? true : false;
      });
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projetService.getProjetById(+params.get('id')))
    ).subscribe(result => {
      this.projet = result.body;
      this.projetId = result.body.id;

    });
  }

  getTravauxById() {
    this.projetService.getProjetById(this.id).subscribe(res => {
      this.projet = res.body;
    });
  }

  achat() {
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
