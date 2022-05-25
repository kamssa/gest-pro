import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Travaux} from '../../../../model/travaux';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SteTravauxService} from '../../../../service/ste-travaux.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {switchMap} from 'rxjs/operators';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {CumulDepensesComponent} from '../../cumul-depenses/cumul-depenses.component';
import {MatDialog} from '@angular/material/dialog';

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
  travaux: Travaux;
  travauxId: number;
  solde: number;
  total: number;
  panelOpenState = false;
  constructor(private route: ActivatedRoute,
              private travauxService: SteTravauxService, private  router: Router,
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
        this.travauxService.getTravauxById(+params.get('id')))
    ).subscribe(result => {
      this.travaux = result.body;
      this.travauxId = result.body.id;

    });
  }

  getTravauxById() {
    this.travauxService.getTravauxById(this.id).subscribe(res => {
      this.travaux = res.body;
    });
  }

  achat() {
    this.edit = 0;
  }

  onCumulDepense(id: number) {
    console.log(id);
    this.dialog.open(CumulDepensesComponent,{
      data: {
        travaux: id
      }
    });
  }
}
