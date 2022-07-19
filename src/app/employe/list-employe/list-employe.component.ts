import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'service', 'actions'];
  listData: MatTableDataSource<any>;
  departements: Departement[];
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  employes: Employe[];
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  userRoles: string [] = [];

  constructor(private employeService: EmployeService,
              public dialog: MatDialog, private authService: AuthService,
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
            this.roles = resultat.body.roles;
            // Vérifie si le tableau contient le droit de la personne retournnée
            this.roles.forEach(val => {
              this.ROLE_NAME = val.name;
              this.userRoles.push(this.ROLE_NAME);
            });
            if  (this.userRoles.includes('ROLE_ENTREPRISE') ){
              this.employeService.getEmployeByIdEntreprise(this.personne.id).subscribe(list => {
                console.log(list.body);
                console.log(list);
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
            }else if (this.userRoles.includes('ROLE_EMPLOYE') || this.userRoles.includes('ROLE_ADMINISTRATION')){

              this.employeService.getEmployeByIdEntreprise(this.personne.departement.entreprise.id).subscribe(list => {

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
              this.error ='Vous n\'etes pas autorisé';

            }




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
  onCreate() {
     if ( this.userRoles.includes('ROLE_ENTREPRISE') || this.userRoles.includes('ROLE_EMPLOYE') || this.userRoles.includes('ROLE_ADMINISTRATION')){
       this.employeService.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      const dialogRef = this.dialog.open(AddEmployeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul=> {

        this.employeService.employeCreer$
          .subscribe(result => {
            this.array.unshift(result.body);
            this.array = this.array;
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;


          });
      });
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  onEdit(row){
    if ( this.userRoles.includes('ROLE_ENTREPRISE') || this.userRoles.includes('ROLE_EMPLOYE') || this.userRoles.includes('ROLE_ADMINISTRATION')){
      this.employeService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      const dialogRef = this.dialog.open(AddEmployeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul => {

        this.employeService.employeModif$
          .subscribe(result => {
            const index: number = this.array.indexOf(row);
            if (index !== -1) {
              this.array[index] = result.body;
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;

            }
          });
      });
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  onDelete(row){
    if ( this.userRoles.includes('ROLE_ENTREPRISE') || this.userRoles.includes('ROLE_EMPLOYE') || this.userRoles.includes('ROLE_ADMINISTRATION')){
      if(confirm('Voulez-vous vraiment supprimer l\'employé ?')){
        this.employeService.deleteEmployeById(row.id).subscribe(result => {

        });
        this.notificationService.warn('Suppression avec succès');

      }
      const index: number = this.array.indexOf(row);
      if (index !== -1) {
        this.array.splice(index, 1);
        this.listData = new MatTableDataSource(this.array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log('Affiche Voici mon tableau', index);

      }
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
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
