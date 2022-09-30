import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Employe} from '../model/Employe';
import {AuthService} from '../service/auth.service';
import {AdminService} from '../service/admin.service';
import {EmployeService} from '../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Projet} from '../model/projet';
import {ProjetService} from '../service/projet.service';


@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrls: ['./technique.component.scss']
})
export class TechniqueComponent implements OnInit {
  editMode: any;
  name: any;
  projet: Projet;
  @HostBinding('class.is-open')
  isOpen = false;
  title = 'la liste des sites';
  projets: Projet[] = [];
  selectedProjet: Projet;
  messageSucces: string;
  messageServiceErreur: string;
  statut: number;
  resultat: Projet[] = [];
  oTravaux: Observable<Projet[]>;
  searchProjetSource = new BehaviorSubject<string>('');
  pathNullImage = './assets/images/image3.jpg';
  personne: any;
  employe: Employe;
  res: any;
  nav: boolean;
  type: string;
  currentUser: any;
  userRoles: string [] = [];
  roles: any;
  ROLE_NAME: any;
  error = '';
  edit = true;

  constructor(
    private  router: Router, private  fb: FormBuilder,
    private  projetService: ProjetService,
    private snackBar: MatSnackBar,
    private authService: AuthService,  private adminService: AdminService,
    private employeService: EmployeService,  private helper: JwtHelperService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        this.roles = resultat.body.roles;
        // Vérifie si le tableau contient le droit de la personne retournnée
        this.roles.forEach(val => {
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);
        });
        if (this.userRoles.includes('ROLE_MANAGER') || this.userRoles.includes('ROLE_ADMINISTRATION') || this.userRoles.includes('ROLE_TECHNICIEN') ){
          this.employeService.getEmployeById(this.personne.id).subscribe( result => {
            this.employe = result.body;
            this.nav = true;
            this.oTravaux = this.searchProjetSource
              .pipe(
                debounceTime(100),
                distinctUntilChanged(),
                switchMap(mc => mc ?  this.projetService.rechercheProjetParMc(mc, this.employe.departement.entreprise.nom)
                  : this.projetService.rechercheProjetParMc('Aucun projet trouvé !','Aucun projet trouvé !'))
              );
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
                this.projet[this.findSelectedProjetIndex()] = res.body;
                this.messageSucces = res.messages.toString();
                this.snackBar.open(this.messageSucces, '', {
                  duration: 3000
                });
              }
            );
            this.projetService.projetSupprime$.subscribe(
              res => {
                let index: number;
                index = this.findSelectedProjetIndex();
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
        }else {
          this.error ='Vous n\'etes pas autorisé';
          this.edit = false;
        }

      });

    }

  }

  toutsLesTravaux() {
    this.projetService.getAllProjet()
      .subscribe(data => {
        this.projets = data.body;
        this.statut = data.status;
      });

  }
  findSelectedProjetIndex(): number {
    return this.projets.indexOf(this.selectedProjet);
  }



  search(mc: string) {

    this.searchProjetSource.next(mc);
  }

  onSelect(projet: Projet) {
    this.selectedProjet = projet;
    this.router.navigate(['technique/addImage', this.selectedProjet.id]);
  }

  closeMessage() {
    setTimeout(() => {
      this.messageServiceErreur = '';
    }, 5000);
  }

  onImages(id: number) {
    this.router.navigate(['technique/edite', id]);
  }

  modifier() {

  }
}
