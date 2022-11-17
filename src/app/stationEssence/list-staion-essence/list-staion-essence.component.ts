import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Resultat} from '../../model/resultat';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../helper/notification.service';
import {StationEssence} from '../../model/stationEssence';
import {StaionEssenceService} from '../../service/staion-essence.service';
import {AddStaionEssenceComponent} from '../add-staion-essence/add-staion-essence.component';
import {StationEssenceState} from '../ngrx-station/stationEssence.reducer';
import {DeleteStationEssenceAction} from '../ngrx-station/stationEssence.actions';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-list-staion-essence',
  templateUrl: './list-staion-essence.component.html',
  styleUrls: ['./list-staion-essence.component.scss']
})
export class ListStaionEssenceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nom', 'solde', 'actions'];
  listData: MatTableDataSource<Resultat<StationEssence[]>>;
  dataSource: any;
  stationEssences: any;
  entreprise: any;
  personne: any;
  id: number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() state: StationEssenceState | null = null;
  constructor(private store: Store,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private staionEssenceService: StaionEssenceService,
              private notificationService: NotificationService,
              private authService: AuthService)
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
          this.id = this.personne.id;
          this.entreprise = this.personne;

        }else if (this.personne.type === 'EMPLOYE'){
          this.id = this.personne.departement.entreprise.id;
          this.entreprise = this.personne.departement.entreprise;

        }
      });
    }
    this.stationEssences = this.state.stationEssences.map(item => {
      console.log('voir la liste de retour', item);
      return {
        id: item.id,
        ...item
      };
    });
    this.listData = new MatTableDataSource(this.stationEssences);
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
  onEdit(row){
    this.staionEssenceService.initializeFormGroup();
    this.staionEssenceService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddStaionEssenceComponent,{
      data: {
        entreprise: this.entreprise
      }

    });


  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer la banque ?')){
      this.store.dispatch(new DeleteStationEssenceAction(row));
      this.notificationService.warn('Suppression avec succès');
    }


  }

}
