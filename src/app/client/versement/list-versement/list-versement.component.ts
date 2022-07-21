import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../service/client.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VersementService} from '../../../service/versement.service';
import {Versement} from '../../../model/Versement';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../../model/Departement';
import {MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AddVersementComponent} from '../add-versement/add-versement.component';
import {DetailVersementService} from '../../../service/detailVersement.service';
import {Projet} from '../../../model/projet';
import {ProjetService} from '../../../service/projet.service';

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.scss']
})
export class ListVersementComponent implements OnInit {
  displayedColumns: string[] = ['date', 'solde', 'actions'];
  listData: MatTableDataSource<Versement>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  projet: Projet;
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  versement: Versement;
  id: number;
  solde: any;
  reste: any;
  constructor(private  clientService: ClientService,
              private  detailVersementService: DetailVersementService,
              private versementService: VersementService,
              private projetService: ProjetService,
              private fb: FormBuilder,   public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Projet) { }

  ngOnInit(): void {
    this.id = this.data['projet'];
    this.versementService.getVersementByTravaux(this.data['projet'])
                        .subscribe(list => {
                          console.log(list);
                          console.log(list.status);
                          if (list.status === 0){
                            this.versement = list.body;

                            this.detailVersementService.getDetailVersementByVersement(list.body.id)
                              .subscribe(data => {
                                this.array = data.body.map(item => {
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
                            this.listData.filterPredicate = (data, filter) => {
                              return this.displayedColumns.some(ele => {
                                return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
                              });
                            };
                          }



                        });
          }





  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row: any) {

  }

  onDelete(row: any) {

  }

  onCreate() {
    const dialogRef = this.dialog.open(AddVersementComponent,{
       data: {
        projet: this.id
      }
    });
    dialogRef.afterClosed().subscribe(resul => {
      this.versementService.versementCreer$
        .subscribe(result => {
          if (result.status === 0){
            console.log(result.body);
            this.detailVersementService.getDetailVersementByVersement(result.body.id)
              .subscribe(res => {
                console.log(res.body);
                this.array.unshift(res.body);
                this.array = this.array;
                this.listData = new MatTableDataSource(this.array);
                this.listData.sort = this.sort;
                this.listData.paginator = this.paginator;
              });

          }else {
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
          }
        });
    });
  }

}
