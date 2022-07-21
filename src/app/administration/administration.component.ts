import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../service/employe.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  personne: any;
  array: any;
  role: boolean;
  role1: boolean;
  role2: boolean;
  role3: boolean;
  roles: any;

  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  userRoles: string [] = [];
  affiche: boolean;
  constructor(private router: Router,
              private employeService: EmployeService,
              private  helper: JwtHelperService) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.employeService.getPersonneById(decoded.sub).subscribe(resultat => {

        this.personne = resultat.body;
        this.roles = resultat.body.roles;
        // Vérifie si le tableau contient le droit de la personne retournnée
        this.roles.forEach(val => {
          this.ROLE_NAME = val.name;
          this.userRoles.push(this.ROLE_NAME);
        });
        if (this.userRoles.includes("ROLE_ADMINISTRATION")) {
          this.employeService.getEmployeById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            this.affiche = true;
          });
        }else {
          this.error ='Vous n\'etes pas autorisé';
          this.affiche = false;
        }
      });
    }

  }

  retrait() {

  }

  stock() {
    this.router.navigate(['/listDetailStock']);
  }

  openDialog() {
    this.router.navigate(['/etatProjet']);
  }
}
