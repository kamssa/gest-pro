import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AutreAchatTravaux} from '../../../model/AutreAchatTravaux';
import {AutreAchatTravauxService} from '../../../service/autre-achat-travaux.service';
import {jsPDF} from "jspdf";
import {AchatTravauxService} from '../../../service/achat-travaux.service';
import {LocationService} from '../../../service/location.service';
import {LoyService} from '../../../service/loy.service';
import {TransportService} from '../../../service/transport.service';
import {AutresService} from '../../../service/autres.service';
import {AuthService} from '../../../service/auth.service';
import {AdminService} from '../../../service/admin.service';
import {ManagerService} from '../../../service/manager.service';
import {EmployeService} from '../../../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {MatTableDataSource} from '@angular/material/table';
import {DetailMainOeuvre} from '../../../model/DetailMainDoeuvre';
import {DetailAutreAchatTravaux} from '../../../model/DetailAutreAchatTravaux';
import {DetailAchatTravaux} from '../../../model/DtailAchat';
import {DetailLoyer} from '../../../model/DetailLoyer';
import {DetailAutres} from '../../../model/DetailAutres';
import {DetailTransport} from '../../../model/DetailTransport';
import {DetailLocation} from '../../../model/DetailLocation';
import {Manager} from '../../../model/Manager';
import {Employe} from '../../../model/Employe';
import {Travaux} from '../../../model/travaux';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MainoeuvreService} from '../../../service/mainoeuvre.service';

@Component({
  selector: 'app-cumul-par-date',
  templateUrl: './cumul-par-date.component.html',
  styleUrls: ['./cumul-par-date.component.scss']
})
export class CumulParDateComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  displayedColumns: string[] = ['date', 'nom',  'salaire', 'nombreJour', 'montantVerser' ];
  dataSource: MatTableDataSource<DetailMainOeuvre>;
  receptacle: any = [];
  detailMainOeuvre: DetailMainOeuvre[] = [];
  detailAutreAchatTravaux: DetailAutreAchatTravaux[];
  detailAchatTravaux: DetailAchatTravaux[] = [];
  detailLoyeTravaux: DetailLoyer[] = [];
  detailTransport: DetailAutres[] = [];
  detailAutre: DetailTransport[] = [];
  detailLocation: DetailLocation[];
  somme: any;
  somme1: any;
  somme2: any;
  somme3: any;
  somme4: any;
  somme5: any;
  somme6: any;
  array: any;
  personne: any;
  manager: Manager;
  employe: Employe;
  res: any;
  nav: boolean;
  type: string;
  currentUser: any;
  travaux: Travaux;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('content', {static: false}) el: ElementRef;
  constructor(public dialogRef: MatDialogRef<CumulParDateComponent>,

  @Inject(MAT_DIALOG_DATA) public data: any,
              private achatTravauxService: AchatTravauxService,
              private mainoeuvreService: MainoeuvreService,
              private  autreAchatTravauxService: AutreAchatTravauxService,
              private locationService: LocationService,
              private loyeService: LoyService,
              private  transportService: TransportService,
              private  autresService: AutresService,
              private authService: AuthService,  private adminService: AdminService,
              private managerService: ManagerService,
              private employeService: EmployeService,
              private helper: JwtHelperService, private siteTravauxService: SteTravauxService) {

  }

  ngOnInit(): void {
    this.siteTravauxService.getTravauxById(this.data.id)
      .subscribe(res => {
        this.travaux = res.body;
        console.log("Voir travaux", this.travaux);
      });
    const id = this.data.id;
    const dateDebut = this.data.dateDebut;
    const dateFin = this.data.dateFin;
    console.log( id );
    console.log(dateDebut );
    console.log( dateFin );



    this.autreAchatTravauxService.getDetailAutreAchatTravauxByDateTravaux(dateDebut, dateFin, id)
      .subscribe(result => {
      console.log('detail detail autre par id travaux', result);
      if (result.length !== 0){
        this.detailAutreAchatTravaux = result;
      }else {
        console.log('pas de detilAutreAchat');
      }

    });
    this.locationService.getDetailLocationByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail location par id travaux', result);
      if (result.length !== 0){
        this.detailLocation = result;
      }else {
        console.log('pas de detailLocation');
      }


    });
    this.loyeService.getDetaiLoyeByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail loyer par id travaux', result);
      if (result.length !== 0){
        this.detailLoyeTravaux = result;
      }else {
        console.log('pas de detailLoye');
      }

    });
    this.mainoeuvreService.getMainDoeuvreByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail main oeuvre par id travaux', result);
      if (result.length !== 0){
        this.detailMainOeuvre = result;
      }else {
        console.log('pas de detailLMain');
      }

    });
    this.transportService.getDetailAutreByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail transport par id travaux', result);
      if (result.length !== 0){
        this.detailTransport = result;
      }else {
        console.log('pas de detailLTransport');
      }

    });
    this.autresService.getDetailAutreByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail autre par id travaux', result);
      if (result.length !== 0){
        this.detailAutre = result;
      }else {
        console.log('pas de detailLAutre');
      }
    });
    this.achatTravauxService.getDetailAchatTravauxByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      if (result.length !== 0){
        this.detailAchatTravaux = result;
      }else {
        console.log('pas de detailLAchat');
      }

      console.log('lenght6', this.detailTransport.length);
    });
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {

        this.personne = resultat.body;
        this.type = this.personne.type;
        if (this.type === 'MANAGER'){
          this.managerService.getManagerById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.nav = true;

          });
        }else if (this.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;
            }
          );

        }

      });

    }
  }
  makePDF(){
    if (this.type === 'MANAGER'){

      const pdf =  new jsPDF('landscape', 'pt',  'a4');

      pdf.canvas.height = 70 * 10;
      pdf.canvas.width = 70 * 7.5;
      pdf.setFontSize(10);
      pdf.setTextColor(255, 0, 0);
      pdf.html(this.el.nativeElement,  {
        callback: (pdf) => {
          pdf.save(this.personne.entreprise.nom);
        }
      });

    }else if (this.type === 'EMPLOYE'){
      // let pdf = new jsPDF('p', 'pt', 'a4');
      let pdf = new jsPDF('landscape', 'pt', 'a4');
      pdf.canvas.height = 70 * 10;
      pdf.canvas.width = 70 * 7.5;
      pdf.setFontSize(22);
      pdf.setTextColor(255, 0, 0);

      pdf.setFontSize(16);
      pdf.setTextColor(0, 255, 0);
      pdf.html(this.el.nativeElement,  {
          'width': 50,
        }

      );
      pdf.save(this.personne.departement.entreprise.nom);
    }

  }

}
