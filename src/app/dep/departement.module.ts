import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { DeparetementLayoutRoutes} from './departement.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddDepComponent} from './add-dep/add-dep.component';
import {FooterComponent} from '../components/footer/footer.component';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {SidebarComponent} from '../components/sidebar/sidebar.component';
import {MaterialModule} from '../material/material.module';

const  depComponents = [
  AddDepComponent,

];

@NgModule({
    declarations: [
   depComponents
    ],

  imports: [
    CommonModule,
    RouterModule.forChild(DeparetementLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  exports: [
    depComponents

  ]
})
export class DepartementModule { }
