import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {filter, map, switchMap} from 'rxjs/operators';
import {UpdateProjetComponent} from '../../../finance/siteTravaux/update-projet/update-projet.component';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AutresService} from '../../../service/autres.service';
import {UpdateEvolutionService} from '../../../service/update-evolution.service';
import {CumulDepensesComponent} from '../../../finance/operationsTravaux/cumul-depenses/cumul-depenses.component';
import {RechercheParDateComponent} from '../../../finance/operationsTravaux/cumul-depenses/recherche-par-date/recherche-par-date.component';
import {EmployeService} from '../../../service/employe.service';
import {Projet} from '../../../model/projet';
import {ProjetService} from '../../../service/projet.service';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {
  name: any;
  id: number;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  projet: Projet;
  projetId: number;
  solde: number;
  panelOpenState = false;
  projet$: Observable<Projet>;
  montant: number;
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  isActive = false;
  constructor(private route: ActivatedRoute,
              private employeService: EmployeService,
              private autresService: AutresService,
              private projetService: ProjetService,
              private  router: Router,
              private mediaObserver: MediaObserver,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private updateEvolutionService: UpdateEvolutionService) {

  }
  ngOnInit(): void {
    this.refreshData();
     setInterval(() => {
      this.refreshData();
    }, 3000);
  }
  refreshData(){
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'EMPLOYE') {
          this.employeService.getEmployeById(this.personne.id).subscribe(res => {
            this.personne = res.body;
          });
        }
      });
    }

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
    });
  }
  update(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(UpdateProjetComponent,
      {

        data: {
          dialogConfig,
          projet: id
        }
      });
  }
  onAchat(travail: Projet) {
    this.router.navigate(['finance/achat', travail.id]);
  }

  onLocation(travail: Projet) {
    this.router.navigate(['finance/location', travail.id]);

  }
  // tslint:disable-next-line:typedef
  updateEvolution(id) {
    this.updateEvolutionService.getEvolution(id)
      .subscribe(result => {
        this.projet = result.body;
        this.projetId = result.body.id;
      });

  }


  onLoyer(travail: Projet) {
    this.router.navigate(['finance/loyer', travail.id]);

  }

  onOeuvre(travail: Projet) {
    this.router.navigate(['finance/oeuvre', travail.id]);

  }

  onTransport(travail: Projet) {
    this.router.navigate(['finance/transport', travail.id]);

  }

  onAutres(travail: Projet) {
    this.router.navigate(['finance/autre', travail.id]);
  }

  cumulDepense(id: number) {
    this.dialog.open(CumulDepensesComponent,{
      data: {
        projet: id
      }
    });

  }

  cumulDepenseDate(id: number) {
    this.dialog.open(RechercheParDateComponent,{
      data: {
        projet: id
      }
    });
  }
}
