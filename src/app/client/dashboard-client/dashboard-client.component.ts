import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterEvent, Event} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {VersementService} from '../../service/versement.service';
import {Versement} from '../../model/Versement';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {Photo} from '../../model/Photo';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ClientService} from '../../service/client.service';
import {DetailVersementService} from '../../service/detailVersement.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Departement} from '../../model/Departement';
import {MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../../service/auth.service';
import {filter} from 'rxjs/operators';
import { Location } from '@angular/common'
import {EmployeService} from '../../service/employe.service';
import {Projet} from '../../model/projet';
import {ProjetService} from '../../service/projet.service';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
  displayedColumns: string[] = ['date', 'montant', 'actions'];
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
  versement: Versement;
  id: number;
  showFiller = false;
  photos: Photo[] = [];
  photo: Photo;
  public path: string;
  name: any;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  projet: Projet;
  panelOpenState = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  pathNullImage = './assets/img/maison.jpg';
  liens: string[] = [];
  constructor(private router: Router, private location: Location,
              private projetService: ProjetService,
              private employeService: EmployeService,
              private helper: JwtHelperService,
              private  versementService: VersementService,
              private  clientService: ClientService,
              private  detailVersementService: DetailVersementService,
              private fb: FormBuilder,   public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Projet,
              private authService: AuthService) {

    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      console.log('Voir ce qui se passe', e.url);
      window.history.pushState({}, '', e.url);
    });
  }

  ngOnInit(): void {


    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        console.log(this.personne);
        this.projetService.getProjetByIdClient(this.personne.id)
          .subscribe(resultat => {
            this.projets = resultat.body;
            this.projets.forEach(v => {
              this.projet = v;
              this.versementService.getVersementByTravaux(v.id)
                .subscribe(data => {
                  this.versement = data.body;
                  this.detailVersementService.getDetailVersementByVersement(this.versement.id)
                    .subscribe(result => {
                      this.array = result.body.map(item => {
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
              this.projetService.getPhotoByIdProjet(v.id).subscribe(data => {
                this.photos = data.body;
                console.log(this.photos);
                this.photos.forEach(value => {
                  this.photo = value;
                  this.path = value.imageUrl;
                  let lien: string = value.imageUrl;
                  this.liens.push(lien);
                  console.log('Voir les path de for', this.path);
                  console.log('Voir les liens', this.liens);
                  let rabl: any = [];
                  for (let i = 0; i < this.liens.length; ++i) {
                    rabl.push({
                      small: this.liens[i],
                      medium: this.liens[i],
                      big: this.liens[i]
                    });
                  }
                  this.galleryImages = rabl;

                  console.log('gallery images', this.galleryImages);
                });

              });
              this.galleryOptions = [
                {
                  width: '600px',
                  height: '400px',
                  thumbnailsColumns: 4,
                  imageAnimation: NgxGalleryAnimation.Slide
                },
                // max-width 800
                {
                  breakpoint: 800,
                  width: '100%',
                  height: '600px',
                  imagePercent: 80,
                  thumbnailsPercent: 20,
                  thumbnailsMargin: 20,
                  thumbnailMargin: 20
                },
                // max-width 400
                {
                  breakpoint: 400,
                  preview: false
                }
              ];
            });
          });
      });
    }
    this.versementService.getVersementByTravaux(this.projet.id)
      .subscribe(list => {
        console.log(list);
        if (list.status === 0){
          this.versement = list.body;


        }else {
          console.log('liste vide');
        }



      });
  }


  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter() {
    //this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
