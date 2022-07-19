import {Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DetailAchatTravaux} from '../../../model/DtailAchat';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DetailMainOeuvre} from '../../../model/DetailMainDoeuvre';
import {MainoeuvreService} from '../../../service/mainoeuvre.service';
import {DialogMainouvreComponent} from '../mainouvre/dialog-mainouvre/dialog-mainouvre.component';
import {AutreAchatTravauxService} from '../../../service/autre-achat-travaux.service';
import {DetailAutreAchatTravaux} from '../../../model/DetailAutreAchatTravaux';
import {LocationService} from '../../../service/location.service';
import {DetailLocation} from '../../../model/DetailLocation';
import {LoyService} from '../../../service/loy.service';
import {DetailLoyer} from '../../../model/DetailLoyer';
import {DetailTransport} from '../../../model/DetailTransport';
import {TransportService} from '../../../service/transport.service';
import {AutresService} from '../../../service/autres.service';
import {DetailAutres} from '../../../model/DetailAutres';
import {jsPDF} from 'jspdf';
import {AchatTravauxService} from '../../../service/achat-travaux.service';
import {Employe} from '../../../model/Employe';
import {AuthService} from '../../../service/auth.service';
import {AdminService} from '../../../service/admin.service';
import {EmployeService} from '../../../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import html2canvas from 'html2canvas';
import {Projet} from '../../../model/projet';
import {ProjetService} from '../../../service/projet.service';

@Component({
  selector: 'app-cumul-depenses',
  templateUrl: './cumul-depenses.component.html',
  styleUrls: ['./cumul-depenses.component.scss']
})
export class CumulDepensesComponent implements OnInit {
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
  employe: Employe;
  res: any;
  nav: boolean;
  type: string;
  currentUser: any;
  projet: Projet;
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
  constructor(private mainoeuvreService: MainoeuvreService,
              @Inject(MAT_DIALOG_DATA) public data: Projet,
              public dialogRef: MatDialogRef<DialogMainouvreComponent>,
              private snackBar: MatSnackBar,
              private router: Router,
              private achatTravauxService: AchatTravauxService,
              private  autreAchatTravauxService: AutreAchatTravauxService,
              private locationService: LocationService,
              private loyeService: LoyService,
              private  transportService: TransportService,
              private  autresService: AutresService,
              private authService: AuthService,  private adminService: AdminService,
              private employeService: EmployeService,
              private helper: JwtHelperService, private projetService: ProjetService) {

this.projetService.getProjetById(this.data['projet'])
  .subscribe(res => {
  this.projet = res.body;
  });

  }

  ngOnInit(): void {
    this.autreAchatTravauxService.getDetailAutreAchatByTravaux(this.data['projet']).subscribe(result => {
      console.log('detail autre achat travaux par id travaux', result);
      this.detailAutreAchatTravaux = result;
      this.autreAchatTravauxService.getAutreDetailAchatTravauxMontantByTravaux(this.data['projet'])
        .subscribe(res => {
          console.log(res);
          this.somme = res;
          console.log(this.somme);
        });

    });
    this.locationService.getDetailLocationByTravaux(this.data['projet']).subscribe(result => {
      console.log('detail detail location par id travaux', result);
      this.detailLocation = result;
      this.locationService.getDetailLocationMontantByTravaux(this.data['projet'])
        .subscribe( res => {
          this.somme1 = res;
        });

    });
    this.loyeService.getDetailLoyeByTravaux(this.data['projet']).subscribe(result => {
      console.log('detail detail loyer par id travaux', result);
      this.detailLoyeTravaux = result;
      this.loyeService.getDetailLoyerMontantByTravaux(this.data['projet'])
        .subscribe(res => {
          this.somme2 = res;
        });
    });
    this.mainoeuvreService.getDetailMainOeuvreByTravaux(this.data['projet']).subscribe(result => {
      console.log('detail detail main oeuvre par id travaux', result);
      this.detailMainOeuvre = result;
      this.mainoeuvreService.getDetailMainDoeuvreMontantByTravaux(this.data['projet'])
        .subscribe(res => {
          this.somme3 = res;
        });
    });
    this.transportService.getDetailTransportByTravaux(this.data['projet']).subscribe(result => {
      console.log('detail detail transport par id travaux', result);
      this.detailTransport = result;
      this.transportService.getDetailTransportMontantByTravaux(this.data['projet'])
        .subscribe(res => {
          this.somme4 = res;
        });
    });
    this.autresService.getDetailAutreByTravaux(this.data['projet']).subscribe(result => {
      console.log('detail detail autre par id travaux', result);
      this.detailAutre = result;
      this.autresService.getAutresMontantByTravaux(this.data['projet'])
        .subscribe(res => {
          this.somme5 = res;
          console.log('somme 5', this.somme5);
        });
    });
    this.achatTravauxService.getDetailAchatTravauxByTravaux(this.data['projet']).subscribe(result => {
      console.log('detail detail autre par id travaux', result);
      this.detailAchatTravaux = result;
      this.achatTravauxService.getDetailAchatTravauxMontantByTravaux(this.data['projet'])
        .subscribe(res => {
          this.somme6 = res;
        });
    });
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(resultat => {

        this.personne = resultat.body;
        this.type = this.personne.type;
        if (this.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.nav = true;


          });
        }else if (this.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
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
}
