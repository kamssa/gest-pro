import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CategorieService} from '../service/categorie.service';
import {StockService} from '../service/stock.service';
import {MatTableDataSource} from '@angular/material/table';
import {Employe} from '../model/Employe';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogConfirmService} from '../helper/dialog-confirm.service';
import {NotificationService} from '../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Departement} from '../model/Departement';
import {MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EmployeService} from '../service/employe.service';
import {Stock} from '../model/Stock';
import {MontantStock} from '../model/MontantStock';
import {MontantStockService} from '../service/montant-stock.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  displayedColumns: string[] = ['stock', 'total', 'actions'];
  listData: MatTableDataSource<any>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 montantStock: MontantStock;
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
  stock: Stock;
  stocks: Stock[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private router: Router,
              private categorieService: CategorieService,
              private montantStockService: MontantStockService,
              private stockService: StockService,
              public dialog: MatDialog,
              private helper: JwtHelperService,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private employeService: EmployeService,
              private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        this.roles = resultat.body.roles;
        this.roles.forEach(val => {
          console.log(val.name);
          this.ROLE_NAME = val.name;
          if (this.ROLE_NAME === 'ROLE_MANAGER'){
            this.ROLE_MANAGER = this.ROLE_NAME;
          }
        });
        this.personne = resultat.body;

        if (this.personne.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.nav = true;
            this.stockService.getStockByIdEntreprise(this.personne.departement.entreprise.id)
              .subscribe(res => {
                if (res.status === 0){
                  this.montantStockService.getMontantStockByIdEntreprise(this.personne.departement.entreprise.id).subscribe(list => {
                    if (list.status === 0){

                      this.montantStock = list.body;
                      console.log('MontantStock', this.montantStock);
                    }else {
                      console.log('erreur');
                    }


                  });
                }
              });

          });
        }else if (this.personne.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;
              this.montantStockService.getMontantStockByIdEntreprise(this.personne.departement.entreprise.id).subscribe(list => {




              });
            });

        }

      });

    }
  }
  openCategorie(row: any) {
    console.log(row.id);
    this.router.navigate(['/detailStock', row.id]);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
  }
  onCreate() {
      this.router.navigate(['/detailStock']);


  }

  onEdit(row){

  }

  onDelete(row){

  }

  onDetaiStock(row: any) {
    console.log(row);
  }

  onCategorie(ev) {
    ev = this.personne.departement.entreprise.id;
    this.router.navigate(['/listDetailStock', ev]);
  }
}
