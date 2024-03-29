import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../service/employe.service';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
  { path: '/administration', title: 'Gestion Direction',  icon: 'dashboard', class: '' },
  { path: '/finance', title: 'Gestion Financière',  icon: 'content_paste', class: '' },
  { path: '/technique', title: 'Gestion Technique',  icon: 'library_books', class: '' },
  { path: '/caisse', title: 'Gestion Caisse',  icon: 'bubble_chart', class: '' },
  { path: '/banque', title: 'Gestion Banque',  icon: 'bubble_chart', class: '' },
  { path: '/mission', title: 'Gestion Mission',  icon: 'bubble_chart', class: '' },
  { path: '/tresorerie', title: 'Gestion Tresorerie',  icon: 'bubble_chart', class: '' },
  { path: '/fournisseur', title: 'Gestion Fournisseur',  icon: 'bubble_chart', class: '' },
  { path: '/vehicule', title: 'Gestion Vehicule',  icon: 'bubble_chart', class: '' },
  { path: '/facture', title: 'Gestion Facture',  icon: 'bubble_chart', class: '' },
  { path: '/client', title: 'Recrouvement',  icon: 'person', class: ''  },
  { path: '/userProfile', title: 'Gestion Employés',  icon: 'person', class: ''  },
  { path: '/dep', title: 'Gestion Departement',  icon: 'domain', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  nav: any;
  constructor(private authService: AuthService,
              private router: Router,
              private employeService: EmployeService,
              private helper: JwtHelperService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
      });
    }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
