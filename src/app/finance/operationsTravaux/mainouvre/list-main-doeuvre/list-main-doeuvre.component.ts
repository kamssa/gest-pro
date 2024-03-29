import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MainOeuvre} from "../../../../model/MainOeuvre";
import {MainoeuvreService} from "../../../../service/mainoeuvre.service";
import {EditMainouvreTravauxComponent} from "../edit-mainouvre-travaux/edit-mainouvre-travaux.component";
import {DialogMainouvreComponent} from "../dialog-mainouvre/dialog-mainouvre.component";
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../../../helper/notification.service';
import {Router} from '@angular/router';
import {Projet} from '../../../../model/projet';

@Component({
  selector: 'app-list-main-doeuvre',
  templateUrl: './list-main-doeuvre.component.html',
  styleUrls: ['./list-main-doeuvre.component.scss']
})
export class ListMainDoeuvreComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  mainOeuvres: MainOeuvre[] = [];
  receptacle: any = [];
  listData: MatTableDataSource<any>;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  personne: any;
  @ViewChild(MatSort) sort: MatSort;

  @Input() projetId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private mainoeuvreService: MainoeuvreService,
              @Inject(MAT_DIALOG_DATA) public data: Projet,
              public dialog: MatDialog,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              private router: Router) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    console.log(this.projetId);
    this.mainoeuvreService.getMainOeuvreByTravaux(this.data['projet'])
      .subscribe( list => {
        if(list.length !== 0){
          this.array = list.map(item => {
            return {
              id: item.id,
              ...item
            };
          });
        }else{
          console.log('aucune donnée');
        }

        this.listData = new MatTableDataSource(this.array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

      });
  }
  redirectToDetails(id: number){
    console.log(id);
  }

  redirectToUpdate(id: number) {
    console.log(id);
    this.dialog.open(EditMainouvreTravauxComponent,{
      data: {
        mainOeuvres: id
      }
    });
  }

  redirectToDelete(row) {
    if (confirm("Voulez vous vraiment supprimer la main d\' oeuvre ? ")) {
      this.mainoeuvreService.supprimerMainOeuvre(row.id).subscribe(data => {
        if(data.status === 0){
          const index: number = this.array.indexOf(row);
          if (index !== -1) {
            this.array.splice(index, 1);
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;

          }
          this.notificationService.warn("Suppression avec succès") ;
          this.router.navigate(['finance/oeuvre', this.projetId]);
        }else {
          this.notificationService.warn("Le déboursé sec n\'est pas renseigné") ;
        }
      });
    }
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

  }

  openDialog(id: number) {
    this.dialog.open(DialogMainouvreComponent,{
      data: {
        mainOeuvres: id
      }
    });
  }
}
