import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {switchMap} from "rxjs/operators";
import {Projet} from '../../model/projet';
import {ProjetService} from '../../service/projet.service';

@Component({
  selector: 'app-edit-tecnique',
  templateUrl: './edit-tecnique.component.html',
  styleUrls: ['./edit-tecnique.component.scss']
})
export class EditTecniqueComponent implements OnInit {
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
              private mediaObserver: MediaObserver) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projetService.getProjetById(+params.get('id')))
    ).subscribe(result => {
      this.projet = result.body;
      this.projetId = result.body.id;
    });
  }

  onImage() {
    this.edit = 0;
  }
}
