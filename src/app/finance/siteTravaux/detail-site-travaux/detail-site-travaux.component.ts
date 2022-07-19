import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {switchMap} from "rxjs/operators";
import {ProjetService} from '../../../service/projet.service';
import {Projet} from '../../../model/projet';

@Component({
  selector: 'app-detail-site-travaux',
  templateUrl: './detail-site-travaux.component.html',
  styleUrls: ['./detail-site-travaux.component.scss']
})
export class DetailSiteTravauxComponent implements OnInit {
    name: any;
    id: number;
    edit: number;
    devicesXs: boolean;
    mediaSub: Subscription;
    projet: Projet;
    projetId: number;
    projet$: Observable<Projet>;
    constructor(private route: ActivatedRoute,
                private projetService: ProjetService, private  router: Router,
                private mediaObserver: MediaObserver) {

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
   getTravauxById(){
  this.projetService.getProjetById(this.id).subscribe( res => {
  this.projet = res.body;
    });
    }

    achat() {
      this.edit = 0;

    }

    salaire() {
    this.edit = 1;
    }

    loyer() {
      this.edit = 4;
    }

    ouvre() {
      this.edit = 3;
    }

    transport() {
      this.edit = 5;
    }

    autre() {
      this.edit = 6;
    }

    location() {
      this.edit = 2;
    }
}
