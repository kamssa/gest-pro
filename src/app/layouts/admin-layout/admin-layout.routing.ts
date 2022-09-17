import {Routes} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {FinanceComponent} from '../../finance/finance.component';
import {ListeSiteTravauxOperationComponent} from '../../finance/siteTravaux/liste-site-travaux-operation/liste-site-travaux-operation.component';
import {EditAchatComponent} from '../../finance/operationsTravaux/achat/edit-achat/edit-achat.component';
import {EditLocationComponent} from '../../finance/operationsTravaux/location/edit-location/edit-location.component';
import {EditPaieLoyerComponent} from '../../finance/operationsTravaux/loyer/edit-paie-loyer/edit-paie-loyer.component';
import {EditMainDoeuvreComponent} from '../../finance/operationsTravaux/mainouvre/edit-main-doeuvre/edit-main-doeuvre.component';
import {EditTransportComponent} from '../../finance/operationsTravaux/transport/edit-transport/edit-transport.component';
import {EditAutreDepenseComponent} from '../../finance/operationsTravaux/autres/edit-autre-depense/edit-autre-depense.component';
import {EditSiteTravauxComponent} from '../../finance/siteTravaux/edit-site-travaux/edit-site-travaux.component';
import {TechniqueComponent} from '../../technique/technique.component';
import {EditTecniqueComponent} from '../../technique/edit-tecnique/edit-tecnique.component';
import {AddImageComponent} from '../../technique/add-image/add-image.component';
import {ListEmployeComponent} from '../../employe/list-employe/list-employe.component';
import {AuthGuardService} from '../../helper/auth-guard.service';
import {ListStockComponent} from '../../stock/list-stock/list-stock.component';
import {ListCategorieComponent} from '../../categorie/list-categorie/list-categorie.component';
import {ListMaterielComponent} from '../../materiel/list-materiel/list-materiel.component';
import {CaisseComponent} from '../../caisse/caisse.component';
import {AdministrationComponent} from '../../administration/administration.component';
import {StockComponent} from '../../stock/stock.component';
import {EditStockComponent} from '../../stock/edit-stock/edit-stock.component';
import {DetailHistoryComponent} from '../../stock/detail-history/detail-history.component';
import {ListCaisseComponent} from '../../caisse/list-caisse/list-caisse.component';
import {AdvanceProjetComponent} from '../../administration/advance-projet/advance-projet.component';
import {ListProjetComponent} from '../../administration/advance-projet/list-projet/list-projet.component';
import {EditAutreAchatTravauxComponent} from '../../finance/operationsTravaux/autreAchatTravaux/edit-autre-achat-travaux/edit-autre-achat-travaux.component';
import {ListClientComponent} from '../../client/list-client/list-client.component';
import {BanqueComponent} from '../../banque/banque.component';
import {RetraitComponent} from '../../banque/retrait/retrait.component';
import {DepartementComponent} from '../../dep/departement/departement.component';
import {RouteGuardService} from '../../helper/route-guard.service';
import {ConfigComponent} from '../../config/config/config.component';
import {FactureComponent} from '../../facture/facture/facture.component';
import {VehiculeComponent} from '../../vehicule/vehicule/vehicule.component';
import {FournisseurComponent} from '../../fournisseur/fournisseur/fournisseur.component';
import {ListVehiculeComponent} from '../../vehicule/list-vehicule/list-vehicule.component';
import {CarburantComponent} from '../../comptabilite/carburant/carburant.component';
import {AppVehiculeComponent} from '../../vehicule/app-vehicule/app-vehicule.component';
import {LayoutsVehiculeComponent} from '../../vehicule/layouts-vehicule/layouts-vehicule.component';
import {ListCarburantComponent} from '../../comptabilite/carburant/list-carburant/list-carburant.component';
import {MissionComponent} from '../../comptabilite/mission/mission.component';
import {PrevisionTresorerieComponent} from '../../comptabilite/prevision-tresorerie/prevision-tresorerie.component';
import {ListTresorerieComponent} from '../../comptabilite/prevision-tresorerie/list-tresorerie/list-tresorerie.component';
import {ListMissionComponent} from '../../comptabilite/mission/list-mission/list-mission.component';


export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile',   component: ListEmployeComponent },
  { path: 'config',   component: ConfigComponent },
  { path: 'dep' ,
    canActivate: [RouteGuardService],
    component: DepartementComponent},
  { path: 'facture' ,
    canActivate: [RouteGuardService],
    component: FactureComponent},
  { path: 'fournisseur' ,
    canActivate: [RouteGuardService],
    component: FournisseurComponent},
  { path: 'vehicule' ,
    canActivate: [RouteGuardService],
    component: LayoutsVehiculeComponent,
    children: [
      {
      path: 'listVehicule',
      component: VehiculeComponent,
    },

  ]},
  { path: 'carburant' ,
    canActivate: [RouteGuardService],
    component: CarburantComponent,
    children: [
      {
        path: 'listCarburant',
        component: ListCarburantComponent,
      },
      {
        path: 'listVehiculeCarburant',
        component: VehiculeComponent,
      },

    ]},
  { path: 'tresorerie' ,
    canActivate: [RouteGuardService],
    component: PrevisionTresorerieComponent,
    children: [
      {
        path: 'listTresorerie',
        component:  ListTresorerieComponent
      }

    ]},
  { path: 'mission' ,
    canActivate: [RouteGuardService],
    component: MissionComponent,
    children: [
      {
        path: 'listMission',
        component: ListMissionComponent
      }

    ]},
  {  path : 'finance',
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: FinanceComponent,
        children: [
          {
            path: 'detail/:id',

            component: ListeSiteTravauxOperationComponent

          },
          {
            path: 'achat/:id',
            component: EditAchatComponent

          },
          {
            path: 'autreAchat/:id',
            component: EditAutreAchatTravauxComponent

          },
          {
            path: 'location/:id',
            component: EditLocationComponent

          },

          {
            path: 'loyer/:id',
            component: EditPaieLoyerComponent

          },
          {
            path: 'oeuvre/:id',
            component: EditMainDoeuvreComponent

          },
          {
            path: 'transport/:id',
            component: EditTransportComponent

          },
          {
            path: 'autre/:id',
            component: EditAutreDepenseComponent

          },

          {
            path: ':id/edite',
            component: EditSiteTravauxComponent,
          },
          {
            path: 'creer', component: EditSiteTravauxComponent,
          }

        ]

      }

    ]},
  { path: 'technique',
    children: [
      {path: '',
        component: TechniqueComponent,
        children: [
          {path: 'addImage/:id', component: AddImageComponent},
          {path: 'edite/:id', component: EditTecniqueComponent}
        ]},

    ]},
  {
    path: 'stock', component: StockComponent
  },
  {
    path: 'client', component: ListClientComponent
  },
  {
    path: 'categorie', component: ListCategorieComponent
  },
  {
    path: 'materiel/:id', component: ListMaterielComponent
  },
  {
    path: 'detailStockHistory/:id', component: DetailHistoryComponent
  },
  {
    path: 'listDetailStock/:id', component: ListStockComponent
  },
  {
    path: 'detailStock/:id', component: EditStockComponent
  },
  {
    path: 'caisse', component: CaisseComponent
  },
  {
    path: 'listCaisse', component: ListCaisseComponent
  },
  {
    path: 'administration', component: AdministrationComponent
  },

  {
    path: 'etatProjet', component: AdvanceProjetComponent
  },
  {
    path: 'etat/:id',

    component: ListProjetComponent

  },

  { path: 'banque',
    children: [{
      path: '',
      component: BanqueComponent,
      children: [
        {path: 'retrait', component: RetraitComponent}
      ]
    }
    ]

  },
 /* { path: 'salaire',
    //canActivate: [AuthGuardService],
    children: [{
      path: '',
      component: SalaireGesComponent
    }
    ]

  },*/
];
