import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../service/client.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Client} from '../../../model/Client';
import {Travaux} from '../../../model/travaux';
import {VersementService} from '../../../service/versement.service';
import {Versement} from '../../../model/Versement';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../../model/Departement';
import {MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AddEmployeComponent} from '../../../employe/add-employe/add-employe.component';
import {AddVersementComponent} from '../add-versement/add-versement.component';
import {UpdateClientComponent} from '../../update-client/update-client.component';
import {UpdateVersementComponent} from '../update-versement/update-versement.component';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {DetailVersement} from '../../../model/DetailVersement';
import {DetailVersementService} from '../../../service/detailVersement.service';

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.scss']
})
export class ListVersementComponent implements OnInit {
  displayedColumns: string[] = ['date', 'solde', 'actions'];
  listData: MatTableDataSource<any>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  travaux: Travaux;
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
              private steTravauxService: SteTravauxService,
              private fb: FormBuilder,   public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Travaux) { }

  ngOnInit(): void {
    this.id = this.data['travaux'];
    this.versementService.getVersementByTravaux(this.data['travaux'])
                        .subscribe(list => {
                          console.log(list);
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
                           console.log('liste vide');
                          }



                        });
          }





  applyFilter() {

  }

  onSearchClear() {

  }

  onEdit(row: any) {

  }

  onDelete(row: any) {

  }

  onCreate() {
    this.dialog.open(AddVersementComponent,{
       data: {
        travaux: this.id
      }
    });

  }
}
