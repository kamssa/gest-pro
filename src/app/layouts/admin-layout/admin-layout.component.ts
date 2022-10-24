import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from 'jquery';
import {Location, PopStateEvent} from '@angular/common';
import {filter} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';
import {UpdateEvolutionService} from '../../service/update-evolution.service';
import {EmployeService} from '../../service/employe.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  personne: any;
  userRoles: string [] = [];
  constructor(public location: Location, private router: Router,
              private notificationService: NotificationService,
              private helper: JwtHelperService,
              private employeService: EmployeService,
              private authService: AuthService,
              private updateEvolutionService: UpdateEvolutionService) {
  }

  ngOnInit(): void {

    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function

      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = document.querySelector('.main-panel');
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this._router = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
    }

    const window_width = $(window).width();
    const $sidebar = $('.sidebar');
    const $sidebar_responsive = $('body > .navbar-collapse');
    const $sidebar_img_container = $sidebar.find('.sidebar-background');


    if (window_width > 767) {
      if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
        $('.fixed-plugin .dropdown').addClass('open');
      }

    }

    $('.fixed-plugin a').click(function(event) {
      // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
      if ($(this).hasClass('switch-trigger')) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      }
    });

    $('.fixed-plugin .badge').click(function() {
      const $full_page_background = $('.full-page-background');


      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      const new_color = $(this).data('color');

      if ($sidebar.length !== 0) {
        $sidebar.attr('data-color', new_color);
      }

      if ($sidebar_responsive.length !== 0) {
        $sidebar_responsive.attr('data-color', new_color);
      }
    });

    $('.fixed-plugin .img-holder').click(function() {
      const $full_page_background = $('.full-page-background');

      $(this).parent('li').siblings().removeClass('active');
      $(this).parent('li').addClass('active');


      const new_image = $(this).find('img').attr('src');

      if ($sidebar_img_container.length != 0) {
        $sidebar_img_container.fadeOut('fast', function() {
          $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
          $sidebar_img_container.fadeIn('fast');
        });
      }

      if ($full_page_background.length != 0) {

        $full_page_background.fadeOut('fast', function() {
          $full_page_background.css('background-image', 'url("' + new_image + '")');
          $full_page_background.fadeIn('fast');
        });
      }

      if ($sidebar_responsive.length !== 0) {
        $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
      }
    });
    if (localStorage.getItem('currentUser')) {
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

      });
    }

  }

  ngAfterViewInit() {
    this.runOnRouteChange();
  }

  isMaps(path) {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }


  config() {
 this.router.navigate(['/config']);
  }

  document() {
    if (this.ROLE_MANAGER){
      this.notificationService.warn('vous êtes autorisé !') ;
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }
  }

  maj() {
    if (this.ROLE_MANAGER){
      this.notificationService.warn('vous êtes autorisé !') ;
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }
  }

  stock() {
    if (this.userRoles.includes('ROLE_ADMINISTRATION') || this.userRoles.includes('ROLE_GESTIONNAIRE_STOCK')) {
      this.router.navigate(['/stock']);
    }else {
      this.notificationService.warn('Vous n\'êtes pas autorisé !') ;
    }

  }

  compta() {
    if (this.ROLE_MANAGER){
      this.notificationService.warn('vous êtes autorisé !') ;
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }
  }

  abonnement() {

  }
}
