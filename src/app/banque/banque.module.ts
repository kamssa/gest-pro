import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {BanqueComponent} from './banque.component';
import {ListOperationComponent} from './list-operation/list-operation.component';
import {EditOperationComponent} from './edit-operation/edit-operation.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RetraitComponent } from './retrait/retrait.component';
import { VersementComponent } from './versement/versement.component';
import { AddBanqueComponent } from './banque/add-banque/add-banque.component';
import { BanqueNavBarComponent } from './banque-nav-bar/banque-nav-bar.component';
import { ListBanqueComponent } from './banque/list-banque/list-banque.component';
import { BanqueConfigComponent } from './banque/banque-config/banque-config.component';
import { ListVersementComponent } from './versement/list-versement/list-versement.component';
import { AddVersementComponent } from './versement/add-versement/add-versement.component';
import { AddRetraitComponent } from './retrait/add-retrait/add-retrait.component';
import { ListRetraitComponent } from './retrait/list-retrait/list-retrait.component';
import { ChoixBanqueComponent } from './choix-banque/choix-banque.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  BanqueComponent,
    ListOperationComponent,
    EditOperationComponent,
    RetraitComponent,
    VersementComponent,
    AddBanqueComponent,
    BanqueNavBarComponent,
    ListBanqueComponent,
    BanqueConfigComponent,
    ListVersementComponent,
    AddVersementComponent,
    AddRetraitComponent,
    ListRetraitComponent,
    ChoixBanqueComponent
  ],
  exports: [
    BanqueComponent,
    BanqueComponent,
    ListOperationComponent,
    EditOperationComponent,
    RetraitComponent,
    BanqueConfigComponent
  ]
})
export class BanqueModule { }
