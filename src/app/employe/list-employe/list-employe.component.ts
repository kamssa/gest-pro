import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Employe} from '../../model/Employe';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EmployeService} from '../../service/employe.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddEmployeComponent} from '../add-employe/add-employe.component';
import {AuthService} from '../../service/auth.service';
import {Departement} from '../../model/Departement';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';
import {EmployePermitionComponent} from '../employe-permition/employe-permition.component';
import {EmployesState} from '../ngrx-employe/employe.reducer';
import {Store} from '@ngrx/store';
import {
  DeleteEmployesAction,
  GetSelectedEmpoyesAction,
  GetSuspenuEmpoyesAction
} from '../ngrx-employe/employe.actions';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['nomComplet', 'service', 'activer', 'suspendu', 'actions'];
  listData: MatTableDataSource<Employe>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() state: EmployesState | null = null;
  checked: any;
  selection = new SelectionModel<Employe>(true, []);
  searchKey: any;
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  userRoles: string [] = [];
  erreur = true;
  entreprise: any;
  employe: Employe;
  constructor(private employeService: EmployeService,
              private store: Store,
              public dialog: MatDialog, private authService: AuthService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private helper: JwtHelperService,
              private notificationService: NotificationService) {
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

    this.array = this.state.employes.map(item => {
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
  onEdit(row){
    this.employeService.initializeFormGroup();
    this.employeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddEmployeComponent, {
      data: {
        entreprise: this.entreprise
      }

    });


  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer l\'employe ?')){
      console.log(row);
      this.store.dispatch(new DeleteEmployesAction(row.id));
      this.notificationService.warn('Suppression avec succès');
    }


  }
  onEmployeToggleActiver($event, row) {
    if ($event.checked === true) {
      row.actevated = true;
      console.log(row);
      if(confirm('Voulez-vous vraiment Activation l\'employe ?')){
        this.store.dispatch(new GetSelectedEmpoyesAction(row));
        this.notificationService.warn('Activation avec succès');
      }
    }else {
      row.actevated = false;
      if(confirm('Voulez-vous vraiment desactivation l\'employe ?')){
        this.store.dispatch(new GetSelectedEmpoyesAction(row));
        this.notificationService.warn('desactivation avec succès');

      }


    }
  }

  onEmployeToggleSuspendu($event, row) {

    if ($event.checked === true) {
      row.suspendu = true;
      if(confirm('Voulez-vous vraiment Activation l\'employe ?')){
        this.store.dispatch(new GetSuspenuEmpoyesAction(row));
        this.notificationService.warn('Activation avec succès');
      }
    }else {
      row.suspendu = false;
      if(confirm('Voulez-vous vraiment Activation l\'employe ?')){
        this.store.dispatch(new GetSuspenuEmpoyesAction(row));
        this.notificationService.warn('Activation avec succès');
      }
    }
  }
  onPermit(row: any) {
    this.employeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EmployePermitionComponent, dialogConfig);

  }
}
