import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ComponentsModule} from './components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FinanceModule} from './finance/finance.module';
import {MaterialModule} from './material/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TechniqueModule} from './technique/technique.module';
import {BanqueModule} from './banque/banque.module';
import {SalaireModule} from './salaire/salaire.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';
import {DatePipe, DecimalPipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from './helper/format-datepicker';
import {MatTableModule} from '@angular/material/table';
import {ChartistModule} from 'ng-chartist';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {departementReducer} from './dep/ngrx-dep/dep.reducer';
import {DepartementEffects} from './dep/ngrx-dep/dep.effects';
import {ErrorCatchingInterceptor} from './helper/errorCatchingInterceptor';
import {banqueReducer} from './banque/banque/ngrx-banque/banque.reducer';
import {BanqueEffects} from './banque/banque/ngrx-banque/banque.effects';
import {vehiculeReducer} from './vehicule/ngrx-vehicule/vehicule.reducer';
import {VehiculeEffects} from './vehicule/ngrx-vehicule/vehicule.effects';
import {stationEssenceReducer} from './stationEssence/ngrx-station/stationEssence.reducer';
import {StationEssenceEffects} from './stationEssence/ngrx-station/stationEssence.effects';
import {employeReducer} from './employe/ngrx-employe/employe.reducer';
import {EmployeEffects} from './employe/ngrx-employe/employe.effects';
import {CarburantEffects} from './comptabilite/carburant/ngrx-carburant/carburant.effects';
import {carburantReducer} from './comptabilite/carburant/ngrx-carburant/carburant.reducer';
import { CarburantParVehiculeComponent } from './comptabilite/carburant/carburant-par-vehicule/carburant-par-vehicule.component';
import { CarburantParVehiculeMoisComponent } from './comptabilite/carburant/carburant-par-vehicule-mois/carburant-par-vehicule-mois.component';
import { RetraitStockComponent } from './stock/retrait-stock/retrait-stock.component';



registerLocaleData(localeFr);
// Add dependencies to FusionChartsModule


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    AdminLayoutModule,
    BrowserAnimationsModule,
    FinanceModule,
    MaterialModule,
    HttpClientModule,
    TechniqueModule,
    BanqueModule,
    SalaireModule,
    MatTableModule,
    ChartistModule,
    StoreModule.forRoot({
      departementState: departementReducer,
      banqueState: banqueReducer,
      vehiculeSate: vehiculeReducer,
      stationEssenceState: stationEssenceReducer,
      employesState: employeReducer,
      carburantState: carburantReducer

    }),
    EffectsModule.forRoot([
      DepartementEffects,
      BanqueEffects,
      VehiculeEffects,
      StationEssenceEffects,
      EmployeEffects,
      CarburantEffects
    ]),
    StoreDevtoolsModule.instrument()

  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    DatePipe, DecimalPipe,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
