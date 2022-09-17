import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Resultat} from '../../../model/resultat';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../../helper/notification.service';
import {BanqueState} from '../ngrx-banque/banque.reducer';
import {BanqueService} from '../../../service/banque.service';
import {AddBanqueComponent} from '../add-banque/add-banque.component';
import {DeleteBanqueAction} from '../ngrx-banque/banque.actions';
import {Banque} from '../../../model/Banque';

@Component({
  selector: 'app-list-banque',
  templateUrl: './list-banque.component.html',
  styleUrls: ['./list-banque.component.scss']
})
export class ListBanqueComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'actions'];
  listData: MatTableDataSource<Resultat<Banque[]>>;
  dataSource: any;
  array: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() state: BanqueState | null = null;
  constructor(private store: Store,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private banqueService: BanqueService,
              private notificationService: NotificationService)
  {

  }
  ngOnInit(): void {
    this.array = this.state.banques.map(item => {
      console.log(item);
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
    this.banqueService.initializeFormGroup();
    this.banqueService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddBanqueComponent);


  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer la banque ?')){
      this.store.dispatch(new DeleteBanqueAction(row));
      this.notificationService.warn('Suppression avec succès');
    }


  }

  addBanque() {

  }
}
