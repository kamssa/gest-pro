import {Action} from '@ngrx/store';
import {Resultat} from '../../../model/resultat';
import {Carburant} from '../../../model/carburant';
import {GetAllVehiculeByEntrepriseActionError} from '../../../vehicule/ngrx-vehicule/vehicule.actions';


export enum CarburantsActionsTypes{
  /* Get All carburant*/
  GET_ALL_CARUBURANTSBYENTREPRISE= '[carburants] Get All carburants by entreprise',
  GET_ALL_CARUBURANTSBYENTREPRISE_SUCCESS= '[carburants] Get All carburants by entreprise Success',
  GET_ALL_CARUBURANTSBYENTREPRISE_ERROR= '[carburants] Get All carburants by entreprise Error',

  /* Get Selected carburant*/
  GET_SELECTED_CARUBURANTS= '[carburants] Get Selected carburants',
  GET_SELECTED_CARUBURANTS_SUCCESS= '[carburants] Get Selected carburants Success',
  GET_SELECTED_CARUBURANTS_ERROR= '[carburants] Get Selected carburants Error',


  /* save   carburant*/
  SAVE_CARUBURANTS = '[carburants] Save carburants',
  SAVE_CARUBURANTS_SUCCESS= '[carburants] Save carburants Success',
  SAVE_CARUBURANTS_ERROR= '[carburants] Save carburants Error',

  /* Delete  carburant*/
  DELETE_CARUBURANTS = '[carburants] Delete carburants',
  DELETE_CARUBURANTS_SUCCESS= '[carburants] Delete carburants Success',
  DELETE_CARUBURANTS_ERROR= '[carburants] Delete carburants Error',

  /* Search  carburant*/

  /* Update  carburant*/
  UPDATE_CARUBURANTS = '[carburants] Update carburants',
  UPDATE_CARUBURANTS_SUCCESS= '[carburants] Update carburants Success',
  UPDATE_CARUBURANTS_ERROR= '[carburants] Update carburants Error',
}
/* Get All Products Actions*/

export class GetAllCarburantsByEntrepriseAction implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.GET_ALL_CARUBURANTSBYENTREPRISE;
  constructor(public payload: number) {
  }
}

export class GetAllCarburantsByEntrepriseActionSuccess implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.GET_ALL_CARUBURANTSBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Carburant[]>) {
  }
}

export class GetAllCarburantsByEntrepriseActionError implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.GET_ALL_CARUBURANTSBYENTREPRISE_ERROR;
  constructor(public payload: string) {
  }
}

/* Save Products Actions*/

export class SaveCarburantsAction implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.SAVE_CARUBURANTS;
  constructor(public payload: Carburant) {
  }
}

export class SaveCarburantsActionSuccess implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.SAVE_CARUBURANTS_SUCCESS;

  constructor(public payload: Resultat<Carburant>) {
  }
}

export class SaveCarburantsActionError implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.SAVE_CARUBURANTS_ERROR;
  constructor(public payload: Resultat<Carburant>) {
  }
}
/* Get Selected Products Actions*/

export class GetSelectedCarburantsAction implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.GET_SELECTED_CARUBURANTS;
  constructor(public payload: any) {
  }
}

export class GetSelectedCarburantsActionSuccess implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.GET_SELECTED_CARUBURANTS_SUCCESS;
  constructor(public payload: Carburant[]) {
  }
}

export class GetSeleCtedcarburantsActionError implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.GET_SELECTED_CARUBURANTS_ERROR;
  constructor(public payload: string) {
  }
}
/* Delete Products Actions*/

export class DeleteCarburantsAction implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.DELETE_CARUBURANTS;
  constructor(public payload: Carburant) {
  }
}

export class DeleteCarburantsActionSuccess implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.DELETE_CARUBURANTS_SUCCESS;

  constructor(public payload: Resultat<Carburant>) {
  }
}

export class DeleteCarburantsActionError implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.DELETE_CARUBURANTS_ERROR;
  constructor(public payload: string) {
  }
}

/* Search Products Actions*/


/* Update Products Actions*/

export class UpdateCarburantsAction implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.UPDATE_CARUBURANTS;
  constructor(public payload: Carburant) {
  }
}

export class UpdateCarburantsActionSuccess implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.UPDATE_CARUBURANTS_SUCCESS;

  constructor(public payload: Resultat<Carburant>) {
  }
}

export class UpdateCarburantsActionError implements Action{
  type: CarburantsActionsTypes = CarburantsActionsTypes.UPDATE_CARUBURANTS_ERROR;
  constructor(public payload: Resultat<Carburant>) {
  }
}
export type CarburantActions =
  GetAllCarburantsByEntrepriseAction | GetAllCarburantsByEntrepriseActionSuccess| GetAllVehiculeByEntrepriseActionError
  | GetSelectedCarburantsAction| GetSelectedCarburantsActionSuccess | GetSeleCtedcarburantsActionError
  | SaveCarburantsAction| SaveCarburantsActionSuccess | SaveCarburantsActionError
  | DeleteCarburantsAction | DeleteCarburantsActionSuccess | DeleteCarburantsActionError
  | UpdateCarburantsAction | UpdateCarburantsActionSuccess | UpdateCarburantsActionError
  ;
