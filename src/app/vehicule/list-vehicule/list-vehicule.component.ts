import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Resultat} from '../../model/resultat';
import {Vehicule} from '../../model/vehicule';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {VehiculeService} from '../../service/vehicule.service';
import {NotificationService} from '../../helper/notification.service';
import {AddVehiculeComponent} from '../add-vehicule/add-vehicule.component';
import {VehiculeState} from '../ngrx-vehicule/vehicule.reducer';
import {DeleteVehiculeAction} from '../ngrx-vehicule/vehicule.actions';
import {Entreprise} from '../../model/Entreprise';
import {AddCarburantComponent} from '../../comptabilite/carburant/add-carburant/add-carburant.component';

@Component({
  selector: 'app-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.scss']
})
export class ListVehiculeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['chauffeur', 'matriculation', 'couleur', 'marque', 'actions'];
  listData: MatTableDataSource<Resultat<Vehicule[]>>;
  dataSource: any;
  array: any;
  entreprise: any;
  personne: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() state: VehiculeState | null = null;
  clickedRows: any;
  constructor(private store: Store,
              private authService: AuthService,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private vehiculeService: VehiculeService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<AddVehiculeComponent>,
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
          this.entreprise = this.personne.entreprise;

        }
      });
    }

    this.array = this.state.vehicules.map(item => {
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
    this.listData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }
  onEdit(row){
    this.vehiculeService.initializeFormGroup();
    this.vehiculeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddVehiculeComponent, {
      data: {
        entreprise: this.entreprise
      }

    });


  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer le véhicule ?')){
      this.store.dispatch(new DeleteVehiculeAction(row));
      this.notificationService.warn('Suppression avec succès');
    }


  }

  addCarburant(row: any) {
    this.vehiculeService.initializeFormGroup();
    this.vehiculeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddCarburantComponent, {
      data: {
        vehicule: row
      }

    });


  }

  addPanne(row: any) {

  }

  test(row: any) {


  }

  announceSortChange($event: any) {

  }


}
