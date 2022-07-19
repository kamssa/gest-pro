import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {AchatTravauxService} from '../../service/achat-travaux.service';
import {AuthService} from '../../service/auth.service';
import {AdminService} from '../../service/admin.service';
import {EmployeService} from '../../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Employe} from '../../model/Employe';
import {Site} from '../../model/site';
import {Projet} from '../../model/projet';
import {ProjetService} from '../../service/projet.service';

@Component({
  selector: 'app-advance-projet',
  templateUrl: './advance-projet.component.html',
  styleUrls: ['./advance-projet.component.scss']
})
export class AdvanceProjetComponent implements OnInit {
  createSiteForm: FormGroup;
  editMode: any;
  name: any;
  projet: Projet;
  @HostBinding('class.is-open')
  isOpen = false;
  title = 'la liste des sites';
  projets: Projet[] = [];
  projetId: number;
  selectedProjet: Projet;
  messageSucces: string;
  messageServiceErreur: string;
  statut: number ;
  resultat: Projet[] = [];
  oTravaux: Observable<Projet[]>;
  searchProjetSource = new BehaviorSubject<string>('');
  value = '';
  edit: number;
  personne: any;
  employe: Employe;
  res: any;
  nav: boolean;
  type: string;
  currentUser: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  userRoles: string [] = [];
  roles: any;

  constructor(
    private  router: Router, private  fb: FormBuilder,
    private  projetService: ProjetService,
    private snackBar: MatSnackBar,
    private achatTravauxService: AchatTravauxService,
    private authService: AuthService,  private adminService: AdminService,
    private employeService: EmployeService,  private helper: JwtHelperService) { }

  ngOnInit(): void {

    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(resultat => {

        this.personne = resultat.body;
        console.log(this.personne);
        this.roles = resultat.body.roles;
        // Vérifie si le tableau contient le droit de la personne retournnée
        this.roles.forEach(val => {
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);
        });
        if (this.userRoles.includes('ROLE_ADMINSTRATION')){
          this.employeService.getEmployeById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.nav = true;
            this.oTravaux = this.searchProjetSource
              .pipe(
                debounceTime(100),
                distinctUntilChanged(),
                switchMap(mc => mc ?  this.projetService.rechercheProjetParMc(mc, this.personne.departement.entreprise.nom)
                  : this.projetService.rechercheProjetParMc('Aucun projet trouvé !',''))
              );
            /*this.siteService.getSiteEntreprise(this.personne.entreprise.nom)
              .subscribe(data =>
              {
                this.site = data.body;
              });*/
            this.toutsLesTravaux();
            // renvoie le site créé
            this.projetService.projetCreer$.subscribe(res => {
                this.projets.push(res.body);
                this.messageSucces = res.messages.toString();
                this.snackBar.open(this.messageSucces, '', {
                  duration: 3000
                });
              }
            );
            this.projetService.projetModif$.subscribe(res => {
                this.projets[this.findSelectedTravauxIndex()] = res.body;
                this.messageSucces = res.messages.toString();
                this.snackBar.open(this.messageSucces, '', {
                  duration: 3000
                });
              }
            );
            this.projetService.projetSupprime$.subscribe(
              res => {
                let index: number;
                index = this.findSelectedTravauxIndex();
                this.projets = this.projets.filter((val, i) => i !== index);
                this.messageSucces = res.messages.toString();
                this.snackBar.open(this.messageSucces, '', {
                  duration: 3000
                });
              });
            this.projetService.projetFiltre$
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
              this.oTravaux = this.searchProjetSource
                .pipe(
                  debounceTime(100),
                  distinctUntilChanged(),
                  switchMap(mc => mc ?  this.projetService.rechercheProjetParMc(mc, this.personne.departement.entreprise.nom)
                    : this.projetService.rechercheProjetParMc('Aucun projet trouvé !',''))
                );
              this.toutsLesTravaux();
             /* this.projetService.getSiteEntreprise(this.personne.departement.entreprise.nom)
                .subscribe(data =>
                {
                  this.site = data.body;
                });*/
              // renvoie le site créé
              this.projetService.projetCreer$.subscribe(res => {
                  this.projets.push(res.body);
                  this.messageSucces = res.messages.toString();
                  this.snackBar.open(this.messageSucces, '', {
                    duration: 3000
                  });
                }
              );
              this.projetService.projetModif$.subscribe(res => {
                  this.projets[this.findSelectedTravauxIndex()] = res.body;
                  this.messageSucces = res.messages.toString();
                  this.snackBar.open(this.messageSucces, '', {
                    duration: 3000
                  });
                }
              );
              this.projetService.projetSupprime$.subscribe(
                res => {
                  let index: number;
                  index = this.findSelectedTravauxIndex();
                  this.projets = this.projets.filter((val, i) => i !== index);
                  this.messageSucces = res.messages.toString();
                  this.snackBar.open(this.messageSucces, '', {
                    duration: 3000
                  });
                });
              this.projetService.projetFiltre$
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
    this.projetService.getAllProjet()
      .subscribe(data => {
        this.projets = data.body;
        this.statut = data.status;
      });

  }
  findSelectedTravauxIndex(): number {
    return this.projets.indexOf(this.selectedProjet);
  }

  search(mc: string) {
    this.searchProjetSource.next(mc);
  }

  onSelect(travail) {
    this.selectedProjet = travail;
    console.log(this.selectedProjet.id);
    this.projetId = this.selectedProjet.id;
    this.router.navigate(['etat', this.selectedProjet.id]);
    this.edit = 0;
    console.log(this.edit);
  }

  closeMessage() {
    setTimeout(() => {
      this.messageServiceErreur = '';
    }, 5000);
  }

  onAchat(projet: Projet) {
    this.router.navigate(['finance/achat', projet.id]);
  }

  onLocation(travail: Projet) {
    this.router.navigate(['finance/location', travail.id]);

  }


  onLoyer(travail: Projet) {
    this.router.navigate(['finance/loyer', travail.id]);

  }

  onOeuvre(travail: Projet) {
    this.router.navigate(['finance/oeuvre', travail.id]);

  }

  onTransport(travail: Projet) {
    this.router.navigate(['finance/transport', travail.id]);

  }

  onAutres(travail: Projet) {
    this.router.navigate(['finance/autre', travail.id]);
  }


}

