import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ManagerService} from '../../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SteTravauxService} from '../../service/ste-travaux.service';
import {Travaux} from '../../model/travaux';
import {VersementService} from '../../service/versement.service';
import {Versement} from '../../model/Versement';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {Photo} from '../../model/Photo';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
  personne: any;
  array: any;
  travaux: Travaux[];
  versement: Versement;
  photos: Photo[] = [];
  photo: Photo;
  public path: string;
  name: any;
  id: number;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  panelOpenState = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  pathNullImage = './assets/img/maison.jpg';
  liens: string[] = [];
  constructor(private router: Router,
              private travauxService: SteTravauxService,
              private managerService: ManagerService,
              private helper: JwtHelperService,
              private  versementService: VersementService,) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        console.log(this.personne);
        this.travauxService.getTravauxByIdClient(this.personne.id)
          .subscribe(res => {
            this.travaux = res.body;
            this.travaux.forEach(v => {
              this.versementService.getVersementByTravaux(v.id)
                .subscribe(data => {
                  this.versement = data.body;
                });
              this.travauxService.getPhotoByIdTravaux(v.id).subscribe(data => {
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

  }




}
