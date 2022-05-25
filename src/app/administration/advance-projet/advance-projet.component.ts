import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Travaux} from '../../model/travaux';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {SteTravauxService} from '../../service/ste-travaux.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {AchatTravauxService} from '../../service/achat-travaux.service';
import {AuthService} from '../../service/auth.service';
import {AdminService} from '../../service/admin.service';
import {ManagerService} from '../../service/manager.service';
import {EmployeService} from '../../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Manager} from '../../model/Manager';
import {Employe} from '../../model/Employe';

@Component({
  selector: 'app-advance-projet',
  templateUrl: './advance-projet.component.html',
  styleUrls: ['./advance-projet.component.scss']
})
export class AdvanceProjetComponent implements OnInit {
  createSiteForm: FormGroup;
  editMode: any;
  name: any;
  travail: Travaux;
  @HostBinding('class.is-open')
  isOpen = false;
  title = 'la liste des sites';
  travaux: Travaux[] = [];
  travauxId: number;
  selectedTravaux: Travaux;
  travau: Travaux;
  messageSucces: string;
  messageServiceErreur: string;
  statut: number ;
  resultat: Travaux[] = [];
  oTravaux: Observable<Travaux[]>;
  searchTravauxSource = new BehaviorSubject<string>('');
  value = '';
  edit: number;
  personne: any;
  manager: Manager;
  employe: Employe;
  res: any;
  nav: boolean;
  type: string;
  currentUser: any;
  constructor(
    private  router: Router, private  fb: FormBuilder,
    private  siteTravauxService: SteTravauxService,
    private snackBar: MatSnackBar,  private travauxService: SteTravauxService,
    private achatTravauxService: AchatTravauxService,
    private authService: AuthService,  private adminService: AdminService,
    private managerService: ManagerService,
    private employeService: EmployeService,  private helper: JwtHelperService) { }

  ngOnInit(): void {
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
            this.oTravaux = this.searchTravauxSource
              .pipe(
                debounceTime(100),
                distinctUntilChanged(),
                switchMap(mc => mc ?  this.siteTravauxService.rechercheTravauxParMc(mc, this.personne.entreprise.nom)
                  : this.siteTravauxService.rechercheTravauxParMc('Aucun projet trouvé !',''))
              );
            this.toutsLesTravaux();
            // renvoie le site créé
            this.siteTravauxService.travauxCreer$.subscribe(res => {
                this.travaux.push(res.body);
                this.messageSucces = res.messages.toString();
                this.snackBar.open(this.messageSucces, '', {
                  duration: 3000
                });
              }
            );
            this.siteTravauxService.travauxModif$.subscribe(res => {
                this.travaux[this.findSelectedTravauxIndex()] = res.body;
                this.messageSucces = res.messages.toString();
                this.snackBar.open(this.messageSucces, '', {
                  duration: 3000
                });
              }
            );
            this.siteTravauxService.travauxSupprime$.subscribe(
              res => {
                let index: number;
                index = this.findSelectedTravauxIndex();
                this.travaux = this.travaux.filter((val, i) => i !== index);
                this.messageSucces = res.messages.toString();
                this.snackBar.open(this.messageSucces, '', {
                  duration: 3000
                });
              });
            this.siteTravauxService.travauxFiltre$
              .subscribe(lib => {
                  this.search(lib);
                }
              );
            /* this.messageService.message$.subscribe(msg => {
                 this.messageServiceErreur = msg.toString();
                 this.closeMessage();
               }
             );*/

          });
        }else if (this.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;
              this.oTravaux = this.searchTravauxSource
                .pipe(
                  debounceTime(100),
                  distinctUntilChanged(),
                  switchMap(mc => mc ?  this.siteTravauxService.rechercheTravauxParMc(mc, this.personne.departement.entreprise.nom)
                    : this.siteTravauxService.rechercheTravauxParMc('Aucun projet trouvé !',''))
                );
              this.toutsLesTravaux();
              // renvoie le site créé
              this.siteTravauxService.travauxCreer$.subscribe(res => {
                  this.travaux.push(res.body);
                  this.messageSucces = res.messages.toString();
                  this.snackBar.open(this.messageSucces, '', {
                    duration: 3000
                  });
                }
              );
              this.siteTravauxService.travauxModif$.subscribe(res => {
                  this.travaux[this.findSelectedTravauxIndex()] = res.body;
                  this.messageSucces = res.messages.toString();
                  this.snackBar.open(this.messageSucces, '', {
                    duration: 3000
                  });
                }
              );
              this.siteTravauxService.travauxSupprime$.subscribe(
                res => {
                  let index: number;
                  index = this.findSelectedTravauxIndex();
                  this.travaux = this.travaux.filter((val, i) => i !== index);
                  this.messageSucces = res.messages.toString();
                  this.snackBar.open(this.messageSucces, '', {
                    duration: 3000
                  });
                });
              this.siteTravauxService.travauxFiltre$
                .subscribe(lib => {
                    this.search(lib);
                  }
                );
              /* this.messageService.message$.subscribe(msg => {
                   this.messageServiceErreur = msg.toString();
                   this.closeMessage();
                 }
               );*/

            }

          );

        }

      });

    }
  }
  initForm(): void {
    this.createSiteForm = this.fb.group({
      libelle: [''],
      budget: [''],
      accompte: [''],
      site: this.fb.group({
        nom: ['']
      }),
    });
  }
  toutsLesTravaux() {
    this.siteTravauxService.getAllTravaux()
      .subscribe(data => {
        this.travaux = data.body;
        this.statut = data.status;
      });

  }
  findSelectedTravauxIndex(): number {
    return this.travaux.indexOf(this.selectedTravaux);
  }

  search(mc: string) {
    this.searchTravauxSource.next(mc);
  }

  onSelect(travail) {
    this.selectedTravaux = travail;
    console.log(this.selectedTravaux.id);
    this.travauxId = this.selectedTravaux.id;
    this.router.navigate(['etat', this.selectedTravaux.id]);
    this.edit = 0;
    console.log(this.edit);
  }

  closeMessage() {
    setTimeout(() => {
      this.messageServiceErreur = '';
    }, 5000);
  }

  onAchat(travail: Travaux) {
    this.router.navigate(['finance/achat', travail.id]);
  }

  onLocation(travail: Travaux) {
    this.router.navigate(['finance/location', travail.id]);

  }


  onLoyer(travail: Travaux) {
    this.router.navigate(['finance/loyer', travail.id]);

  }

  onOeuvre(travail: Travaux) {
    this.router.navigate(['finance/oeuvre', travail.id]);

  }

  onTransport(travail: Travaux) {
    this.router.navigate(['finance/transport', travail.id]);

  }

  onAutres(travail: Travaux) {
    this.router.navigate(['finance/autre', travail.id]);
  }


}

