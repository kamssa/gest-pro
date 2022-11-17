import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Observable, Subscription} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {AchatTravauxService} from '../../../service/achat-travaux.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateProjetComponent} from '../update-projet/update-projet.component';
import {AddTravauxSiteComponent} from '../add-travaux-site/add-travaux-site.component';
import {AutresService} from '../../../service/autres.service';
import {CumulDepensesComponent} from '../../operationsTravaux/cumul-depenses/cumul-depenses.component';
import {RechercheParDateComponent} from '../../operationsTravaux/cumul-depenses/recherche-par-date/recherche-par-date.component';
import {Projet} from '../../../model/projet';
import {ProjetService} from '../../../service/projet.service';
import {ListTransportComponent} from '../../operationsTravaux/transport/list-transport/list-transport.component';

@Component({
  selector: 'app-liste-site-travaux-operation',
  templateUrl: './liste-site-travaux-operation.component.html',
  styleUrls: ['./liste-site-travaux-operation.component.scss']
})
export class ListeSiteTravauxOperationComponent implements OnInit{
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

  constructor(private route: ActivatedRoute,
              private projetService: ProjetService,
              private  router: Router,
              private mediaObserver: MediaObserver,
              private achatTravauxService: AchatTravauxService,
              private autresService: AutresService,
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
  achat() {
    this.edit = 0;
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
  autreachat() {
    this.edit = 7;
  }

  montantChange($event) {
    if ($event){
      this.achatTravauxService.travauxCreer$.subscribe(
        result => {

          this.projetService.getProjetById(this.projetId).subscribe(res => {
          this.projet = res.body;
          console.log('Voir le reste ', res.body);
          });
        }
      );
    this.achatTravauxService.travauxSupprime$
      .subscribe(data => {
        this.projetService.getProjetById(this.projetId).subscribe(res => {
          this.projet = res.body;
          console.log('Voir le reste ', res.body);
        });
      });
      this.achatTravauxService.travauxCreer$.subscribe(
        result => {

          this.projetService.getProjetById(this.projetId).subscribe(res => {
            this.projet = res.body;
            console.log('Voir le reste ', res.body);
          });
        }
      );
      this.autresService.autrCreer$.subscribe(
        data => {
          this.projetService.getProjetById(this.projetId).subscribe(res => {
            this.projet = res.body;
            console.log('Voir le reste ', res.body);
          });
        });
    }

  }


  update(id) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      const dialogRef = this.dialog.open(UpdateProjetComponent,
    {

      data: {
        dialogConfig,
        projet: id
      }
    });
    this.projetService.projetModif$
      .subscribe(result => {
        if (result.status === 0){
          this.projet = result.body;
        }

      });



  }

  add(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialogRef = this.dialog.open(AddTravauxSiteComponent,
      {

        data: {
          dialogConfig,
          site: id
        }
      });

  }


    onCumulDepense(id: number) {
    console.log(id);
        this.dialog.open(CumulDepensesComponent,{
          data: {
            projet: id
          }
        });

  }

  onDate(id: number) {
    this.dialog.open(RechercheParDateComponent,{
      data: {
        projet: id
      }
    });
  }


  onAchat(id: number) {
    this.dialog.open(ListTransportComponent,{
      data: {
        projet: id
      }
    });
  }
  onAutreAchat(id: number) {
    this.dialog.open(ListTransportComponent,{
      data: {
        projet: id
      }
    });
  }
  onLocation(id: number) {
    this.dialog.open(ListTransportComponent,{
      data: {
        projet: id
      }
    });

  }


  onLoyer(id: number) {
    this.dialog.open(ListTransportComponent,{
      data: {
        projet: id
      }
    });

  }

  onOeuvre(id: number) {
    this.dialog.open(ListTransportComponent,{
      data: {
        projet: id
      }
    });
  }

  onTransport(id: number) {
    console.log(id);
    this.dialog.open(ListTransportComponent,{
      data: {
        projet: id
      }
    });

  }

  onAutres(id: number) {
    this.dialog.open(ListTransportComponent,{
      data: {
        projet: id
      }
    });
  }
}

