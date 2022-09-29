import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {AdminLayoutComponent} from './admin-layout.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ComponentsModule} from '../../components/components.module';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {MaterialModule} from '../../material/material.module';
import {AddEmployeComponent} from '../../employe/add-employe/add-employe.component';
import {ListEmployeComponent} from '../../employe/list-employe/list-employe.component';
import {ListDepComponent} from '../../dep/list-dep/list-dep.component';
import {MatConfirmDialogComponent} from '../../service/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import {AddStockComponent} from '../../stock/add-stock/add-stock.component';
import {ListStockComponent} from '../../stock/list-stock/list-stock.component';
import {AddMaterielComponent} from '../../materiel/add-materiel/add-materiel.component';
import {ListMaterielComponent} from '../../materiel/list-materiel/list-materiel.component';
import {AddCategorieComponent} from '../../categorie/add-categorie/add-categorie.component';
import {ListCategorieComponent} from '../../categorie/list-categorie/list-categorie.component';
import {ListCaisseComponent} from '../../caisse/list-caisse/list-caisse.component';
import {AddCaisseComponent} from '../../caisse/add-caisse/add-caisse.component';
import {CaisseComponent} from '../../caisse/caisse.component';
import {RetraitCaisseComponent} from '../../caisse/retrait-caisse/retrait-caisse.component';
import {VersementCaisseComponent} from '../../caisse/versement-caisse/versement-caisse.component';
import {OperationCaisseComponent} from '../../caisse/operation-caisse/operation-caisse.component';
import {EditOperationCaisseComponent} from '../../caisse/edit-operation-caisse/edit-operation-caisse.component';
import {AdministrationComponent} from '../../administration/administration.component';
import {StockComponent} from '../../stock/stock.component';
import {EditStockComponent} from '../../stock/edit-stock/edit-stock.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {FinanceModule} from '../../finance/finance.module';
import {DetailHistoryComponent} from '../../stock/detail-history/detail-history.component';
import {ComptabiliteComponent} from '../../comptabilite/comptabilite/comptabilite.component';
import {EmployePermitionComponent} from '../../employe/employe-permition/employe-permition.component';
import {AdvanceProjetComponent} from '../../administration/advance-projet/advance-projet.component';
import {ListProjetComponent} from '../../administration/advance-projet/list-projet/list-projet.component';
import {ListClientComponent} from '../../client/list-client/list-client.component';
import {AddVersementComponent} from '../../client/versement/add-versement/add-versement.component';
import {ListVersementComponent} from '../../client/versement/list-versement/list-versement.component';
import {UpdateVersementComponent} from '../../client/versement/update-versement/update-versement.component';
import {VersementComponent} from '../../client/versement/versement.component';
import {UpdateClientComponent} from '../../client/update-client/update-client.component';
import {DashboardClientComponent} from '../../client/dashboard-client/dashboard-client.component';
import {NgxGalleryModule} from 'ngx-gallery-9';
import {DepNavBarComponent} from '../../dep/dep-nav-bar/dep-nav-bar.component';
import {DepartementComponent} from '../../dep/departement/departement.component';
import {ListDepItemComponent} from '../../dep/list-dep/list-dep-item/list-dep-item.component';
import {CarburantComponent} from '../../comptabilite/carburant/carburant.component';
import {ClientComponent} from '../../comptabilite/client/client.component';
import {MissionComponent} from '../../comptabilite/mission/mission.component';
import {PrevisionTresorerieComponent} from '../../comptabilite/prevision-tresorerie/prevision-tresorerie.component';
import {AllProjetComponent} from '../../administration/all-projet/all-projet.component';
import {ConfigComponent} from '../../config/config/config.component';
import {VehiculeComponent} from '../../vehicule/vehicule/vehicule.component';
import {AddVehiculeComponent} from '../../vehicule/add-vehicule/add-vehicule.component';
import {ListVehiculeComponent} from '../../vehicule/list-vehicule/list-vehicule.component';
import {FactureComponent} from '../../facture/facture/facture.component';
import {AddFactureComponent} from '../../facture/add-facture/add-facture.component';
import {ListFactureComponent} from '../../facture/list-facture/list-facture.component';
import {VehiculeNavBarComponent} from '../../vehicule/vehicule-nav-bar/vehicule-nav-bar.component';
import {BanqueModule} from '../../banque/banque.module';
import {FactureNavBarComponent} from '../../facture/facture-nav-bar/facture-nav-bar.component';
import {AddCarburantComponent} from '../../comptabilite/carburant/add-carburant/add-carburant.component';
import {ModifPasswordComponent} from '../../modif-password/modif-password.component';
import {AppVehiculeComponent} from '../../vehicule/app-vehicule/app-vehicule.component';
import {LayoutsVehiculeComponent} from '../../vehicule/layouts-vehicule/layouts-vehicule.component';
import {ListCarburantComponent} from '../../comptabilite/carburant/list-carburant/list-carburant.component';
import {CarburantNavBarComponent} from '../../comptabilite/carburant/carburant-nav-bar/carburant-nav-bar.component';
import {AddMissionComponent} from '../../comptabilite/mission/add-mission/add-mission.component';
import {ListMissionComponent} from '../../comptabilite/mission/list-mission/list-mission.component';
import {ListTresorerieComponent} from '../../comptabilite/prevision-tresorerie/list-tresorerie/list-tresorerie.component';
import {RechercheCarburantParDateComponent} from '../../comptabilite/carburant/recherche-carburant-par-date/recherche-carburant-par-date.component';
import {AddStaionEssenceComponent} from '../../stationEssence/add-staion-essence/add-staion-essence.component';
import {StaionEssenceComponent} from '../../stationEssence/staion-essence/staion-essence.component';
import {ListStaionEssenceComponent} from '../../stationEssence/list-staion-essence/list-staion-essence.component';
import {EmployeComponent} from '../../employe/employe/employe.component';
import {EmployeNavBarComponent} from '../../employe/employe-nav-bar/employe-nav-bar.component';
import {CaisseNavBarComponent} from '../../caisse/caisse-nav-bar/caisse-nav-bar.component';
import {LayoutEmployeComponent} from '../../employe/layout-employe/layout-employe.component';
import {LayoutDepartementComponent} from '../../dep/layout-departement/layout-departement.component';
import {EntreEmailComponent} from '../../modif-password/entre-email/entre-email.component';
import {CarburantLayoutComponent} from '../../comptabilite/carburant/carburant-layout/carburant-layout.component';
import {LayoutMissionComponent} from '../../comptabilite/mission/layout-mission/layout-mission.component';
import {MissionNavBarComponent} from '../../comptabilite/mission/mission-nav-bar/mission-nav-bar.component';
import {TresorerieNavbarComponent} from '../../comptabilite/prevision-tresorerie/tresorerie-navbar/tresorerie-navbar.component';
import {LayoutTresorerieComponent} from '../../comptabilite/prevision-tresorerie/layout-tresorerie/layout-tresorerie.component';
import {FournisseurComponent} from '../../comptabilite/fournisseur/fournisseur.component';
import {AddFournisseurComponent} from '../../comptabilite/fournisseur/add-fournisseur/add-fournisseur.component';
import {ListFournisseurComponent} from '../../comptabilite/fournisseur/list-fournisseur/list-fournisseur.component';
import {FourniseurNavBarComponent} from '../../comptabilite/fournisseur/fourniseur-nav-bar/fourniseur-nav-bar.component';
import {LayoutFourniseurComponent} from '../../comptabilite/fournisseur/layout-fourniseur/layout-fourniseur.component';
import {CarburantParVehiculeComponent} from '../../comptabilite/carburant/carburant-par-vehicule/carburant-par-vehicule.component';
import {CarburantParVehiculeMoisComponent} from '../../comptabilite/carburant/carburant-par-vehicule-mois/carburant-par-vehicule-mois.component';
import {DepartementModule} from '../../dep/departement.module';




@NgModule({
    declarations: [
        AdminLayoutComponent,
        DashboardComponent,
        UserProfileComponent,
        AddEmployeComponent,
        ListEmployeComponent,
        ListDepComponent,
        MatConfirmDialogComponent,
        AddStockComponent,
        ListStockComponent,
        AddMaterielComponent,
        ListMaterielComponent,
        AddCategorieComponent,
        ListCategorieComponent,
        ListCaisseComponent,
        AddCaisseComponent,
        CaisseComponent,
        RetraitCaisseComponent,
        VersementCaisseComponent,
        OperationCaisseComponent,
        EditOperationCaisseComponent,
        AdministrationComponent,
        StockComponent,
        EditStockComponent,
        DetailHistoryComponent,
        ComptabiliteComponent,
        EmployePermitionComponent,
        AdvanceProjetComponent,
        ListProjetComponent,
        DashboardComponent,
        ListClientComponent,
        AddVersementComponent,
        ListVersementComponent,
        UpdateVersementComponent,
        VersementComponent,
        UpdateClientComponent,
        DashboardClientComponent,
        DepNavBarComponent,
        DepartementComponent,
        ListDepItemComponent,
        FournisseurComponent,
       CarburantComponent,
      ClientComponent,
      MissionComponent,
      PrevisionTresorerieComponent,
      AllProjetComponent,
      ConfigComponent,
      AddFournisseurComponent,
      ListFournisseurComponent,
      VehiculeComponent,
      AddVehiculeComponent,
      ListVehiculeComponent,
      FactureComponent,
      AddFactureComponent,
      ListFactureComponent,
      VehiculeNavBarComponent,
      FactureNavBarComponent,
      AddCarburantComponent,
      ModifPasswordComponent,
      AppVehiculeComponent,
      LayoutsVehiculeComponent,
      ListCarburantComponent,
      ListFournisseurComponent,
      CarburantNavBarComponent,
      AddMissionComponent,
      ListMissionComponent,
      ListTresorerieComponent,
      RechercheCarburantParDateComponent,
      ListStaionEssenceComponent,
      AddStaionEssenceComponent,
      StaionEssenceComponent,
      EmployeComponent,
      EmployeNavBarComponent,
      CaisseNavBarComponent,
      LayoutEmployeComponent,
      LayoutDepartementComponent,
      EntreEmailComponent,
      CarburantLayoutComponent,
      LayoutMissionComponent,
      MissionNavBarComponent,
      TresorerieNavbarComponent,
      LayoutTresorerieComponent,
      AddFournisseurComponent,
      FourniseurNavBarComponent,
      LayoutFourniseurComponent,
      CarburantParVehiculeComponent,
      CarburantParVehiculeMoisComponent,


    ],

  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    ComponentsModule,
    MaterialModule,
    NgxIntlTelInputModule,
    Ng2TelInputModule,
    FinanceModule,
    NgxGalleryModule,
    BanqueModule,
    DepartementModule
  ]

})
export class AdminLayoutModule { }
