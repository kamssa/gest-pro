import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {NotificationService} from '../../helper/notification.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EditOperationCaisseComponent} from '../edit-operation-caisse/edit-operation-caisse.component';
import {CaisseDetail} from '../../model/CaisseDetail';
import {EmployeService} from '../../service/employe.service';
import {CaisseDetailService} from '../../service/caisse-detail.service';
import {CaisseService} from '../../service/caisse.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-list-caisse',
  templateUrl: './list-caisse.component.html',
  styleUrls: ['./list-caisse.component.scss']
})
export class ListCaisseComponent implements OnInit {
  displayedColumns: string[] = ['date', 'designation', 'montant',  'employe' , 'actions'];
  listData: MatTableDataSource<any>;

  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  roles: [];
  array: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  personne: any;
  caisseDetail: CaisseDetail[];
  searchKey: any;
  constructor(
              private  caisseDetailService: CaisseDetailService,
              private caisseService: CaisseService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService,
              private authService: AuthService,
              private employeService: EmployeService) {
  }
  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        this.roles = resultat.body.roles;

        this.personne = resultat.body;

        if (this.personne.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.nav = true;
            console.log(this.personne.departement.entreprise.id);
            this.caisseDetailService.getCaisseDetailByEntrepriseId(this.personne.departement.entreprise.id).subscribe(list => {
             if(list.status === 0){
               console.log(list.body);
               this.array =  list.body.map(item => {
                 return {
                   id: item.id,
                   ...item
                 };
               });
             }else {
               console.log('aucune donnée');
             }

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
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;
              this.caisseDetailService.getCaisseDetailByEntrepriseId(this.personne.departement.entreprise.id).subscribe(list => {

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

        }

      });

    }
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);

      this.authService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        this.roles = res.body.roles;

      });

    }


  }

  onCreate() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EditOperationCaisseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(resul => {
      this.caisseService.caisseCreer$
        .subscribe(result => {
          if (result.status === 0){
            /*this.array.unshift(result.body);
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;*/
            this.caisseDetailService.getCaisseDetailByEntrepriseId(this.personne.entreprise.id).subscribe(list => {

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
          }else {
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
          }
        });
    });
  }

  applyFilter() {

  }

  onSearchClear() {

  }

  onEdit(row: any) {

  }

  onDelete(row: any) {
      if (confirm('Voulez-vous vraiment supprimer la caisse ?')){
        this.caisseService.supprimerCaisse(row.id).subscribe(result => {
          if(result.status === 0){
            this.notificationService.warn('Suppression avec succès');
            const index: number = this.array.indexOf(row);
            if (index !== -1) {
              this.array.splice(index, 1);
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;

            }
          }else {
            this.notificationService.warn('Vous devez d\'abord supprimer les articles');

          }
        });

      }


  }


}
