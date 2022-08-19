import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {AuthGuardService} from './helper/auth-guard.service';
import {DashboardClientComponent} from './client/dashboard-client/dashboard-client.component';
import {AuthGuardClientService} from './helper/auth-guard-client.service';



const routes: Routes = [
  { path: 'login', component: ConnexionComponent },
  {path: 'dashboardClient',
    canActivate: [AuthGuardClientService],
    component: DashboardClientComponent},
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
    useHash: true,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
