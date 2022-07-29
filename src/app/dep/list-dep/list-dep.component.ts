import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DepService} from '../../service/dep.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddDepComponent} from '../add-dep/add-dep.component';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {Employe} from '../../model/Employe';
import {EmployeService} from '../../service/employe.service';
import {RoleService} from '../../service/role.service';
import {EntrepriseService} from '../../service/entreprise.service';

@Component({
  selector: 'app-list-dep',
  templateUrl: './list-dep.component.html',
  styleUrls: ['./list-dep.component.scss']
})
export class ListDepComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['libelle', 'description', 'actions'];
  listData: MatTableDataSource<Departement>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: any;

  personne: any;
  array: any;
  roles: any;
  employe: Employe;
  res: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  userRoles: string [] = [];
  erreur = true;
  departements: Departement[];

  constructor(private departementService: DepService,
              private entrepriseService: EntrepriseService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private helper: JwtHelperService,
              private employeService: EmployeService,
              private roleService: RoleService)
  {

  }
  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
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
        if (this.userRoles.includes('ROLE_ENTREPRISE')){
            this.nav = true;
            this.departementService.getDepByIdEntreprise(this.personne.id)
              .subscribe(list => {
               // this.departements = list.body;
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

        }else if (this.userRoles.includes('ROLE_MANAGER') || this.userRoles.includes('ROLE_ADMINISTRATION')) {
            this.nav = true;
            this.departementService.getDepByIdEntreprise(this.personne.departement.entreprise.id)
              .subscribe(list => {
             //   this.departements = list.body;
                this.array = list.body.map(item => {
                  return {
                    id: item.id,
                    ...item
                  };
                });
                this.listData = new MatTableDataSource(this.array);
                this.listData.filterPredicate = (data, filter) => {
                  return this.displayedColumns.some(ele => {
                    return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
                  });
                };

              });
            console.log(this.listData.paginator);
        }else {
          this.error ='Vous n\'etes pas autorisé';
          this.erreur = false;
        }

      });

    }
  }
  ngAfterViewInit() {
   // this.listData.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

  onCreate() {
      if (this.userRoles.includes('ROLE_ENTREPRISE') || this.userRoles.includes('ROLE_MANAGER') || this.userRoles.includes('ROLE_ADMINISTRATION')){
      this.departementService.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      const dialogRef = this.dialog.open(AddDepComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul => {
        console.log('verifier retour dialog open');
        this.departementService.depCreer$
          .subscribe(result => {
            console.log(result.body);
            if (result.status === 0){
              this.array.unshift(result.body);
              this.array = this.array;
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;


            }else {
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

  onEdit(row){
    if (this.userRoles.includes('ROLE_ENTREPRISE') || this.userRoles.includes('ROLE_MANAGER') || this.userRoles.includes('ROLE_ADMINISTRATION')){
      this.departementService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      const dialogRef = this.dialog.open(AddDepComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul => {
        console.log('verifier retour dialog update');
        this.departementService.depModif$
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
    }else{
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  onDelete(row){
    if (this.userRoles.includes('ROLE_ENTREPRISE') || this.userRoles.includes('ROLE_ADMINISTRATION') || this.userRoles.includes('ROLE_MANAGER')){
      if (confirm('Voulez-vous vraiment supprimer le departement ?')){
        this.departementService.supprimerDepartement(row.id).subscribe(result => {
          console.log(result);
        });
        this.notificationService.warn('Suppression avec succès');
      }
      const index: number = this.array.indexOf(row);
      if (index !== -1) {
        this.array.splice(index, 1);
        this.listData = new MatTableDataSource(this.array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }
}
