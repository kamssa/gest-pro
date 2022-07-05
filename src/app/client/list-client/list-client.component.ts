import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../../model/resultat';
import {Travaux} from '../../model/travaux';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {MessageService} from '../../service/message.service';
import {environment} from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Photo} from '../../model/Photo';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Employe} from '../../model/Employe';
import {EmployeService} from '../../service/employe.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AuthService} from '../../service/auth.service';
import {ManagerService} from '../../service/manager.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';
import {AddEmployeComponent} from '../../employe/add-employe/add-employe.component';
import {EmployePermitionComponent} from '../../employe/employe-permition/employe-permition.component';
import {SteTravauxService} from '../../service/ste-travaux.service';
import {UpdateClientComponent} from '../update-client/update-client.component';
import {EditTranspTravauxComponent} from '../../finance/operationsTravaux/transport/edit-detail/edit-transp-travaux.component';
import {ListVersementComponent} from '../versement/list-versement/list-versement.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  displayedColumns: string[] = ['projet', 'site', 'client', 'email', 'telephone', 'actions'];
  listData: MatTableDataSource<any>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  travaux: Travaux[];
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  constructor(private travauxService: SteTravauxService,
              public dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router,
              private helper: JwtHelperService,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'MANAGER') {
          this.managerService.getManagerById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            console.log('Entreprise', this.personne.entreprise.id);
            this.travauxService.getTravauxByIdSite(this.personne.entreprise.id).subscribe(list => {
              console.log('Voir list retournée pour les projets', list);
              this.array = list.body.map(item => {
                return {
                  id: item.id,
                  ...item
                };
              });
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
              this.listData.filterPredicate = (data, filter) => {
                return this.displayedColumns.some(ele => {
                  return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
                });
              };

            });
          });
        }else {
          this.error ='Vous n\'etes pas autorisé';
        }
      });
    }

    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          console.log(val.name);
          this.ROLE_NAME = val.name;
          if (this.ROLE_NAME === 'ROLE_MANAGER'){
            this.ROLE_MANAGER = this.ROLE_NAME;
          }
        });
      });

    }

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row: any) {
    console.log('Voir la ligne recuperer', row);
    console.log('Voir la ligne recuperer', row.client.id);
    if(this.ROLE_NAME === "ROLE_MANAGER"){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(UpdateClientComponent,{
        data: {
          client: row.client.id
        }
      });

    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  onDelete(row: any) {

  }

  onVersement(row: any) {
    console.log('Voir la ligne recuperer', row);
    if(this.ROLE_NAME === "ROLE_MANAGER"){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(ListVersementComponent,{
        data: {
          travaux: row.id
        }
      });

    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }
  }
}
