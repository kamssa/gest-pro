import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {DepartementState} from '../ngrx-dep/dep.reducer';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {DeleteDepartementAction} from '../ngrx-dep/dep.actions';
import {Resultat} from '../../model/resultat';
import {NotificationService} from '../../helper/notification.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddDepComponent} from '../add-dep/add-dep.component';
import {AuthService} from '../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DepService} from '../../service/dep.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';


@Component({
  selector: 'app-list-dep',
  templateUrl: './list-dep.component.html',
  styleUrls: ['./list-dep.component.scss']
})
export class ListDepComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['libelle', 'description', 'actions'];
   listData: MatTableDataSource<Resultat<Departement[]>>;
  dataSource: any;
  array: any;
  entreprise: any;
  personne: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() state: DepartementState | null = null;
  constructor(private store: Store,
              private authService: AuthService,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private depService: DepService,
              private notificationService: NotificationService,
              private cdr: ChangeDetectorRef)
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

    this.array = this.state.departements.map(item => {

      return {
        id: item.id,
        ...item
      };
    });
    this.listData = new MatTableDataSource(this.array);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.cdr.detectChanges();

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
    this.depService.initializeFormGroup();
    this.depService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddDepComponent, {
      data: {
        entreprise: this.entreprise
      }

    });


  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer le département ?')){
      this.store.dispatch(new DeleteDepartementAction(row.id));
      this.notificationService.warn('Suppression avec succès');
    }


  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {

   /* if (sortState.direction) {
      this.liv.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }*/
  }
}
