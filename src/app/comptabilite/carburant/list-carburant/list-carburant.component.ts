import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Resultat} from '../../../model/resultat';
import {Vehicule} from '../../../model/vehicule';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {VehiculeState} from '../../../vehicule/ngrx-vehicule/vehicule.reducer';
import {Store} from '@ngrx/store';
import {AuthService} from '../../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MAT_DIALOG_DATA, MatDialog, } from '@angular/material/dialog';
import {NotificationService} from '../../../helper/notification.service';
import {Entreprise} from '../../../model/Entreprise';

import {Prestation} from '../../../model/prestation';
import {CarburantState} from '../ngrx-carburant/carburant.reducer';
import {DeleteCarburantsAction} from '../ngrx-carburant/carburant.actions';

@Component({
  selector: 'app-list-carburant',
  templateUrl: './list-carburant.component.html',
  styleUrls: ['./list-carburant.component.scss']
})
export class ListCarburantComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'conducteur', 'matriculation', 'libelle', 'prixUnitaire', 'quantite', 'total', 'stationEssence', 'actions'];
  listData: MatTableDataSource<Resultat<Prestation[]>>;
  dataSource: any;
  array: any;
  entreprise: any;
  personne: any;
  transactions: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() state: CarburantState | null = null;
  constructor(private authService: AuthService,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private store: Store,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: Entreprise)
  {

  }
  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const token = currentUser.body.body.accessToken;
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'ENTREPRISE') {
          this.entreprise = this.personne;

        }else if (this.personne.type === 'EMPLOYE'){
          this.entreprise = this.personne.departement.entreprise;

        }
      });
    }

    this.array = this.state.carburants.map(item => {
      return {
        id: item.id,
        ...item
      };
    });

    this.listData = new MatTableDataSource(this.array);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.listData.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

  onEdit(row: any) {

  }

  onDelete(row: any) {
    if(confirm('Voulez-vous vraiment supprimer la ligne ?')){
      this.store.dispatch(new DeleteCarburantsAction(row));
      this.notificationService.warn('Suppression avec succès');
    }

  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    //return this.listData.map(t => t.).reduce((acc, value) => acc + value, 0);
  }
}
