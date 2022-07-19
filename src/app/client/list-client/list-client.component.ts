import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AuthService} from '../../service/auth.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';
import {UpdateClientComponent} from '../update-client/update-client.component';
import {ListVersementComponent} from '../versement/list-versement/list-versement.component';
import {EmployeService} from '../../service/employe.service';
import {Projet} from '../../model/projet';
import {ProjetService} from '../../service/projet.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  displayedColumns: string[] = ['projet',  'client', 'email', 'telephone', 'actions'];
  listData: MatTableDataSource<any>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  projets: Projet[];
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  constructor(private projetService: ProjetService,
              public dialog: MatDialog, private authService: AuthService,
              private employeService: EmployeService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router,
              private helper: JwtHelperService,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        console.log(resultat.body);
        if (this.personne.type === 'EMPLOYE') {
          this.employeService.getEmployeById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            this.projetService.getProjetByIdEntreprise(this.personne.departement.entreprise.id)
              .subscribe(list => {
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
        }else if (this.personne.type === 'EMPLOYE'){
          console.log('Personne est employe', this.personne);
          this.employeService.getEmployeById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            console.log('employe', this.personne);
            this.projetService.getProjetByIdEntreprise(this.personne.departement.entreprise.id)
               .subscribe(list => {
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

        }else{
          this.error ='Vous n\'etes pas autorisé';
        }
      });
    }

    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(res => {
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
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(UpdateClientComponent,{
        data: {
          client: row.client.id
        }
      });



  }

  onDelete(row: any) {

  }

  onVersement(row: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(ListVersementComponent,{
        data: {
          projet: row.id
        }
      });


  }
}
