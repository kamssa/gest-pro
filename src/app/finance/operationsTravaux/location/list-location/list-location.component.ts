import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {LocationService} from "../../../../service/location.service";
import {LocationTravaux} from "../../../../model/LocationTravaux";
import {DialogLocationComponent} from "../dialog-location/dialog-location.component";
import {EditLocationTravauxComponent} from "../edit-detail/edit-location-travaux.component";
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../../../helper/notification.service';
import {Router} from '@angular/router';
import {EmployeService} from '../../../../service/employe.service';
import {Projet} from '../../../../model/projet';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})
export class ListLocationComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  listData: MatTableDataSource<any>;
  locations: LocationTravaux[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  personne: any;
  @Input() projetId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private locationService: LocationService,
              @Inject(MAT_DIALOG_DATA) public data: Projet,
              public dialog: MatDialog,
              private employeService: EmployeService,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              private router: Router) {
  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    console.log(this.projetId);
    this.locationService.getLocationByTravaux(this.projetId)
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
    console.log(id);
    this.dialog.open(EditLocationTravauxComponent,{
      data: {
        locationTravaux: id
      }
    });
  }

  redirectToDelete(row) {
    if (confirm("Voulez vous vraiment supprimer la location ? ")) {
      this.locationService.supprimerLocation(row.id).subscribe(data => {
        if(data.status === 0){
          const index: number = this.array.indexOf(row);
          if (index !== -1) {
            this.array.splice(index, 1);
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;

          }
          this.notificationService.warn("Suppression avec succès") ;
          this.router.navigate(['finance/location', this.projetId]);
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
    this.dialog.open(DialogLocationComponent,{
      data: {
        locationTravaux: id
      }
    });
  }

}
