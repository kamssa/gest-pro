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
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cumul-par-date',
  templateUrl: './cumul-par-date.component.html',
  styleUrls: ['./cumul-par-date.component.scss']
})
export class CumulParDateComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  detailMainOeuvre: DetailMainOeuvre[] = [];
  detailAutreAchatTravaux: DetailAutreAchatTravaux[];
  detailAchatTravaux: DetailAchatTravaux[] = [];
  detailLoyeTravaux: DetailLoyer[] = [];
  detailTransport: DetailAutres[] = [];
  detailAutre: DetailTransport[] = [];
  detailLocation: DetailLocation[] = [];
  somme: any;
  somme1: any;
  somme2: any;
  somme3: any;
  somme4: any;
  somme5: any;
  somme6: any;
  array: number[] = [];
  personne: any;
  manager: Manager;
  employe: Employe;
  res: any;
  nav: boolean;
  type: string;
  currentUser: any;
  travaux: Travaux;
  role: boolean;
  role1: boolean;
  role2: boolean;
  role3: boolean;

  ROLES: any;
  ROLE_NAME: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('content', {static: false}) el: ElementRef;
  @ViewChild('invoice') invoiceElement!: ElementRef;

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
        this.detailAutreAchatTravaux.forEach( v => {
          const m = v.montant;
          this.array.push(v.montant);

          console.log('push', this.array);
          this.somme  = this.array.reduce(
            (previousValue, currentValue) => previousValue + currentValue);

          console.log('Somme cumulée',  this.somme );
        });

      }else {
        console.log('pas de detilAutreAchat');
      }

    });
    this.locationService.getDetailLocationByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail location par id travaux', result);
      if (result.length !== 0){
        this.detailLocation = result;
        this.detailLocation.forEach( v => {
          this.array.push(v.montant);
          this.somme1  = this.array.reduce(
            (previousValue, currentValue) => previousValue + currentValue);
        });
      }else {
        console.log('pas de detailLocation');
      }


    });
    this.loyeService.getDetaiLoyeByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail loyer par id travaux', result);
      if (result.length !== 0){
        this.detailLoyeTravaux = result;
        this.detailLoyeTravaux.forEach( v => {
          this.array.push(v.montant);
          this.somme2  = this.array.reduce(
            (previousValue, currentValue) => previousValue + currentValue);
        });
      }else {
        console.log('pas de detailLoye');
      }

    });
    this.mainoeuvreService.getMainDoeuvreByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail main oeuvre par id travaux', result);
      if (result.length !== 0){
        this.detailMainOeuvre = result;
        this.detailMainOeuvre.forEach( v => {
          this.array.push(v.montantVerser);
          this.somme3  = this.array.reduce(
            (previousValue, currentValue) => previousValue + currentValue);
        });
      }else {
        console.log('pas de detailLMain');
      }

    });
    this.transportService.getDetailAutreByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail transport par id travaux', result);
      if (result.length !== 0){
        this.detailTransport = result;
        this.detailTransport.forEach( v => {
          this.array.push(v.montant);
          this.somme4  = this.array.reduce(
            (previousValue, currentValue) => previousValue + currentValue);
        });
      }else {
        console.log('pas de detailLTransport');
      }

    });
    this.autresService.getDetailAutreByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      console.log('detail detail autre par id travaux', result);
      if (result.length !== 0){
        this.detailAutre = result;
        this.detailAutre.forEach( v => {
          this.array.push(v.montant);
          this.somme5  = this.array.reduce(
            (previousValue, currentValue) => previousValue + currentValue);
        });
      }else {
        console.log('pas de detailLAutre');
      }
    });
    this.achatTravauxService.getDetailAchatTravauxByDateTravaux(dateDebut, dateFin, id).subscribe(result => {
      if (result.length !== 0){
        this.detailAchatTravaux = result;
        this.detailAchatTravaux.forEach( v => {
          this.array.push(v.montant);
          this.somme6  = this.array.reduce(
            (previousValue, currentValue) => previousValue + currentValue);
        });
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
              this.personne = rest.body;
              this.nav = false;
              this.personne = rest.body;
              console.log(this.personne);
              this.ROLES = this.personne.roles;
              const names = this.ROLES.map(el => el.name);
              this.role = names.includes("ROLE_ADMINISTRATION");
              this.role1 = names.includes("ROLE_EMPLOYE");
              this.role2 = names.includes("ROLE_TECHNICIEN");
              this.role3 = names.includes("ROLE_COMPTABILITE");
            }
          );

        }

      });

    }
  }
  makePDF(){
    if (this.type === 'MANAGER'){
      html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas:any) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }
        doc.save(this.personne.entreprise.nom);
      });
    }else if (this.role && this.role1 && this.role2 && this.role3){
      html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas:any) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }
        doc.save(this.personne.entreprise.nom);
      });
    }


  }
getSomme(){
 return   this.somme + this.somme1;
}
}
