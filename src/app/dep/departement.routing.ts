import {Routes} from '@angular/router';
import {RouteGuardService} from '../helper/route-guard.service';
import {LayoutsVehiculeComponent} from '../vehicule/layouts-vehicule/layouts-vehicule.component';
import {VehiculeComponent} from '../vehicule/vehicule/vehicule.component';
import {CarburantComponent} from '../comptabilite/carburant/carburant.component';
import {CarburantParVehiculeComponent} from '../comptabilite/carburant/carburant-par-vehicule/carburant-par-vehicule.component';
import {LayoutDepartementComponent} from './layout-departement/layout-departement.component';
import {DepartementComponent} from './departement/departement.component';


export const DeparetementLayoutRoutes: Routes = [
  { path: 'dep' ,
    canActivate: [RouteGuardService],
    component: LayoutDepartementComponent,
    children: [
      {
        path: 'listDepartement',
        component: DepartementComponent,
      },
    ]}
  ];
