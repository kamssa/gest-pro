import { Component, OnInit } from '@angular/core';
import {EmployeService} from '../service/employe.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {
  userRoles: string [] = [];
  roles: any;
  ROLE_NAME: any;
  error = '';
  edit: number;
  personne: any;
  editer: boolean;
  constructor( private employeService: EmployeService,  private helper: JwtHelperService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(resultat => {
        console.log('Voir la personne ', this.personne);
        this.roles = resultat.body.roles;
        // Vérifie si le tableau contient le droit de la personne retournnée
        this.roles.forEach(val => {
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);
        });
        if (this.userRoles.includes('ROLE_COMPTABILITE') || this.userRoles.includes('ROLE_ADMINISTRATION') || this.userRoles.includes('ROLE_ACHAT') ){
          this.editer = true;
        }else {
          this.error ='Vous n\'etes pas autorisé';
          this.editer = false;
        }

        });
    }
  }

  retrait() {

  }

  banque() {

  }

  openDialog() {
 this.edit = 1;
  }

  openChantier() {
    this.edit = 0;
  }
}
