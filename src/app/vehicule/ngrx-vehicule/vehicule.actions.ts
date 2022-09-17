import {Action} from '@ngrx/store';
import {Resultat} from '../../model/resultat';
import {Vehicule} from '../../model/vehicule';


export enum VehiculesActionsTypes{
  /* Get All vehicule*/
  GET_ALL_VEHICULESBYENTREPRISE= '[Vehicules] Get All vehicules by entreprise',
  GET_ALL_VEHICULESBYENTREPRISE_SUCCESS= '[Vehicules] Get All vehicules by entreprise Success',
  GET_ALL_VEHICULESBYENTREPRISE_ERROR= '[Vehicules] Get All vehicules by entreprise Error',

  /* Get Selected vehicule*/
  GET_SELECTED_VEHICULES= '[Vehicules] Get Selected vehicules',
  GET_SELECTED_VEHICULES_SUCCESS= '[Vehicules] Get Selected vehicules Success',
  GET_SELECTED_VEHICULES_ERROR= '[Vehicules] Get Selected vehicules Error',

  /* new  vehicule*/
  NEW_VEHICULES = '[Vehicules] New vehicules',
  NEW_VEHICULES_SUCCESS= '[Vehicules] New vehicules Success',
  NEW_VEHICULES_ERROR= '[Vehicules] New vehicules Error',
  /* save   vehicule*/
  SAVE_VEHICULES = '[Vehicules] Save vehicules',
  SAVE_VEHICULES_SUCCESS= '[Vehicules] Save vehicules Success',
  SAVE_VEHICULES_ERROR= '[Vehicules] Save vehicules Error',
  /* Delete  vehicule*/
  DELETE_VEHICULES = '[Vehicules] Delete vehicules',
  DELETE_VEHICULES_SUCCESS= '[Vehicules] Delete vehicules Success',
  DELETE_VEHICULES_ERROR= '[Vehicules] Delete vehicules Error',
  /* Edit   vehicule*/
  EDIT_VEHICULES = '[Vehicules] Edit vehicules',
  EDIT_VEHICULES_SUCCESS= '[Vehicules] Edit vehicules Success',
  EDIT_VEHICULES_ERROR= '[Vehicules] Edit vehicules Error',
  /* Search  vehicule*/

  /* Update  vehicule*/
  UPDATE_VEHICULES = '[Vehicules] Update vehicules',
  UPDATE_VEHICULES_SUCCESS= '[Vehicules] Update vehicules Success',
  UPDATE_VEHICULES_ERROR= '[Vehicules] Update vehicules Error',
}
/* Get All Products Actions*/

export class GetAllVehiculeByEntrepriseAction implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.GET_ALL_VEHICULESBYENTREPRISE;
  constructor(public payload: number) {
  }
}

export class GetAllVehiculeByEntrepriseActionSuccess implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.GET_ALL_VEHICULESBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Vehicule[]>) {
  }
}

export class GetAllVehiculeByEntrepriseActionError implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.GET_ALL_VEHICULESBYENTREPRISE_ERROR;
  constructor(public payload: string) {
  }
}
/* New vehicule Actions*/

export class NewVehiculeAction implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.NEW_VEHICULES;
  constructor(public payload: any) {
  }
}

export class NewVehiculeActionSuccess implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.NEW_VEHICULES_SUCCESS;
  constructor(public payload: any) {
  }
}

export class NewVehiculeActionError implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.NEW_VEHICULES_ERROR;
  constructor(public payload: string) {
  }
}
/* Save vehicule Actions*/

export class SaveVehiculeAction implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.SAVE_VEHICULES;
  constructor(public payload: Vehicule) {
  }
}

export class SaveVehiculeActionSuccess implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.SAVE_VEHICULES_SUCCESS;

  constructor(public payload: Resultat<Vehicule>) {
  }
}

export class SaveVehiculeActionError implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.SAVE_VEHICULES_ERROR;
  constructor(public payload: Resultat<Vehicule>) {
  }
}
/* Get Selected vehicule Actions*/

export class GetSelectedVehiculeAction implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.GET_SELECTED_VEHICULES;
  constructor(public payload: any) {
  }
}

export class GetSelectedVehiculeActionSuccess implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.GET_SELECTED_VEHICULES_SUCCESS;
  constructor(public payload: Vehicule[]) {
  }
}

export class GetSelectedVehiculeActionError implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.GET_SELECTED_VEHICULES_ERROR;
  constructor(public payload: string) {
  }
}
/* Delete vehicule Actions*/

export class DeleteVehiculeAction implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.DELETE_VEHICULES;
  constructor(public payload: Vehicule) {
  }
}

export class DeleteVehiculeActionSuccess implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.DELETE_VEHICULES_SUCCESS;

  constructor(public payload: Resultat<Vehicule>) {
  }
}

export class DeleteVehiculeActionError implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.DELETE_VEHICULES_ERROR;
  constructor(public payload: string) {
  }
}
/* Edit vehicule Actions*/

export class EditVehiculeAction implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.EDIT_VEHICULES;
  constructor(public payload: Vehicule) {
  }
}

export class EditVehiculeActionSuccess implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.EDIT_VEHICULES_SUCCESS;

  constructor(public payload: Resultat<Vehicule>) {
  }
}

export class EditVehiculeActionError implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.EDIT_VEHICULES_ERROR;
  constructor(public payload: string) {
  }
}
/* Search vehicule Actions*/


/* Update vehicule Actions*/

export class UpdateVehiculeAction implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.UPDATE_VEHICULES;
  constructor(public payload: Vehicule) {
  }
}

export class UpdateVehiculeActionSuccess implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.UPDATE_VEHICULES_SUCCESS;

  constructor(public payload: Resultat<Vehicule>) {
  }
}

export class UpdateVehiculeActionError implements Action{
  type: VehiculesActionsTypes = VehiculesActionsTypes.UPDATE_VEHICULES_ERROR;
  constructor(public payload: Resultat<Vehicule>) {
  }
}
export type VehiculeActions =
  GetAllVehiculeByEntrepriseAction | GetAllVehiculeByEntrepriseActionSuccess| GetAllVehiculeByEntrepriseActionError
  | GetSelectedVehiculeAction | GetSelectedVehiculeActionSuccess | GetSelectedVehiculeActionError
  | NewVehiculeAction | NewVehiculeActionSuccess | NewVehiculeActionError
  | SaveVehiculeAction | SaveVehiculeActionSuccess| SaveVehiculeActionError
  | DeleteVehiculeAction | DeleteVehiculeActionSuccess | DeleteVehiculeActionError
  | EditVehiculeAction | EditVehiculeActionSuccess | EditVehiculeActionError
  | UpdateVehiculeAction | UpdateVehiculeActionSuccess| UpdateVehiculeActionError
  ;
