import {Action} from '@ngrx/store';
import {Resultat} from '../../model/resultat';
import {StationEssence} from '../../model/stationEssence';



export enum StationEssenceActionsTypes{
  /* Get All StationEssence*/
  GET_ALL_STATIONESSENCE= '[StationEssence] Get All StationEssence',
  GET_ALL_STATIONESSENCE_SUCCESS= '[StationEssence] Get All StationEssence Success',
  GET_ALL_STATIONESSENCE_ERROR= '[StationEssence] Get All StationEssence Error',

  /* Get Selected StationEssence*/
  GET_SELECTED_STATIONESSENCE= '[StationEssence] Get Selected StationEssence',
  GET_SELECTED_STATIONESSENCE_SUCCESS= '[StationEssence] Get Selected StationEssence Success',
  GET_SELECTED_STATIONESSENCE_ERROR= '[StationEssence] Get Selected StationEssence Error',


  /* save   StationEssence*/
  SAVE_STATIONESSENCE = '[StationEssence] Save StationEssence',
  SAVE_STATIONESSENCE_SUCCESS= '[StationEssence] Save StationEssence Success',
  SAVE_STATIONESSENCE_ERROR= '[StationEssence] Save StationEssence Error',
  /* Delete  vehicule*/
  DELETE_STATIONESSENCE = '[StationEssence] Delete StationEssence',
  DELETE_STATIONESSENCE_SUCCESS= '[StationEssence] Delete StationEssence Success',
  DELETE_STATIONESSENCE_ERROR= '[StationEssence] Delete StationEssence Error',

  /* Search  StationEssence*/

  /* Update  StationEssence*/
  UPDATE_STATIONESSENCE = '[StationEssence] Update StationEssence',
  UPDATE_STATIONESSENCE_SUCCESS= '[StationEssence] Update StationEssence Success',
  UPDATE_STATIONESSENCE_ERROR= '[StationEssence] Update StationEssence Error',
}
/* Get All Products Actions*/

export class GetAllStationEssenceAction implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.GET_ALL_STATIONESSENCE;
  constructor(public payload: number) {
  }
}

export class GetAllStationEssenceActionSuccess implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.GET_ALL_STATIONESSENCE_SUCCESS;

  constructor(public payload: Resultat<StationEssence[]>) {
  }
}

export class GetAllStationEssenceActionError implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.GET_ALL_STATIONESSENCE_ERROR;
  constructor(public payload: string) {
  }
}

/* Save StationEssence Actions*/

export class SaveStationEssenceAction implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.SAVE_STATIONESSENCE;
  constructor(public payload: StationEssence) {
  }
}

export class SaveStationEssenceActionSuccess implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.SAVE_STATIONESSENCE_SUCCESS;

  constructor(public payload: Resultat<StationEssence>) {
  }
}

export class SaveStationEssenceActionError implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.SAVE_STATIONESSENCE_ERROR;
  constructor(public payload: Resultat<StationEssence>) {
  }
}
/* Get Selected vehicule Actions*/

export class GetSelectedStationEssenceAction implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.GET_SELECTED_STATIONESSENCE;
  constructor(public payload: any) {
  }
}

export class GetSelectedStationEssenceActionSuccess implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.GET_SELECTED_STATIONESSENCE_SUCCESS;
  constructor(public payload: StationEssence[]) {
  }
}

export class GetSelectedStationEssenceActionError implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.GET_SELECTED_STATIONESSENCE_ERROR;
  constructor(public payload: string) {
  }
}
/* Delete vehicule Actions*/

export class DeleteStationEssenceAction implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.DELETE_STATIONESSENCE;
  constructor(public payload: StationEssence) {
  }
}

export class DeleteStationEssenceActionSuccess implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.DELETE_STATIONESSENCE_SUCCESS;

  constructor(public payload: Resultat<StationEssence>) {
  }
}

export class DeleteStationEssenceActionError implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.DELETE_STATIONESSENCE_ERROR;
  constructor(public payload: string) {
  }
}

/* Search vehicule Actions*/


/* Update vehicule Actions*/

export class UpdateStationEssenceAction implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.UPDATE_STATIONESSENCE;
  constructor(public payload: StationEssence) {
  }
}

export class UpdateStationEssenceActionSuccess implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.UPDATE_STATIONESSENCE_SUCCESS;

  constructor(public payload: Resultat<StationEssence>) {
  }
}

export class UpdateStationEssenceActionError implements Action{
  type: StationEssenceActionsTypes = StationEssenceActionsTypes.UPDATE_STATIONESSENCE_ERROR;
  constructor(public payload: Resultat<StationEssence>) {
  }
}
export type StationEssenceActions =
  GetAllStationEssenceAction | GetAllStationEssenceActionSuccess| GetAllStationEssenceActionError
  | GetSelectedStationEssenceAction| GetSelectedStationEssenceActionSuccess | GetSelectedStationEssenceActionError
  | SaveStationEssenceAction | SaveStationEssenceActionSuccess| SaveStationEssenceActionError
  | DeleteStationEssenceAction| DeleteStationEssenceActionSuccess | DeleteStationEssenceActionError
  | UpdateStationEssenceAction| UpdateStationEssenceActionSuccess| UpdateStationEssenceActionError
  ;
