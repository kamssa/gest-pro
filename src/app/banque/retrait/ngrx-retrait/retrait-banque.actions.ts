import {Action} from '@ngrx/store';
import {Resultat} from '../../../model/resultat';
import {RetraitBanque} from '../../../model/RetraitBanque';



export enum RetraitBanqueActionsTypes{
  /* Get All Banque*/
  GET_ALL_RETRAIT_BANQUE= '[Retrait] Get All Retrait Banque ',
  GET_ALL_RETRAIT_BANQUE_SUCCESS= '[Retrait] Get All Retrait Banque  Success',
  GET_ALL_RETRAIT_BANQUE_ERROR= '[Retrait] Get All Retrait Banque  Error',

  /* save   Banque*/
  SAVE_RETRAIT_BANQUE = '[Banque] Save Banque',
  SAVE_RETRAIT_BANQUE_SUCCESS= '[Banque] Save Banque Success',
  SAVE_RETRAIT_BANQUE_ERROR= '[Banque] Save Banque Error',

  /* Delete  Banque*/
  DELETE_RETRAIT_BANQUE = '[Banque] Delete Banque',
  DELETE_RETRAIT_BANQUE_SUCCESS= '[Banque] Delete Banque Success',
  DELETE_RETRAIT_BANQUE_ERROR= '[Banque] Delete Banque Error',

  /* Update  departements*/
  UPDATE_RETRAIT_BANQUE = '[Banque] Update Banque',
  UPDATE_RETRAIT_BANQUE_SUCCESS= '[Banque] Update Banque Success',
  UPDATE_RETRAIT_BANQUE_ERROR= '[Banque] Update Banque Error',
}
/* Get All Products Actions*/

export class GetAllRetaitBanqueAction implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.GET_ALL_RETRAIT_BANQUE;
  constructor(public payload: number) {
  }
}

export class GetAllRetraitBanqueActionSuccess implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.GET_ALL_RETRAIT_BANQUE_SUCCESS;

  constructor(public payload: Resultat<RetraitBanque[]>) {
  }
}

export class GetAllRetraitBanqueError implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.GET_ALL_RETRAIT_BANQUE_ERROR;
  constructor(public payload: string) {
  }
}

/* Save Products Actions*/

export class SaveRetraitBanqueAction implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.SAVE_RETRAIT_BANQUE;
  constructor(public payload: RetraitBanque) {
  }
}

export class SaveRetraitBanqueActionSuccess implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.SAVE_RETRAIT_BANQUE_SUCCESS;

  constructor(public payload: Resultat<RetraitBanque>) {
  }
}

export class SaveRetraitBanqueActionError implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.SAVE_RETRAIT_BANQUE_ERROR;
  constructor(public payload: Resultat<RetraitBanque>) {
  }
}

/* Delete Products Actions*/

export class DeleteRetraitBanqueAction implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.DELETE_RETRAIT_BANQUE;
  constructor(public payload: RetraitBanque) {
  }
}

export class DeleteRetraitBanqueActionSuccess implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.DELETE_RETRAIT_BANQUE_SUCCESS;

  constructor(public payload: Resultat<RetraitBanque>) {
  }
}

export class DeleteRetraitBanqueActionError implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.DELETE_RETRAIT_BANQUE_ERROR;
  constructor(public payload: string) {
  }
}

/* Search Products Actions*/


/* Update Products Actions*/

export class UpdateRetraitBanqueAction implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.UPDATE_RETRAIT_BANQUE;
  constructor(public payload: RetraitBanque) {
  }
}

export class UpdateRetraitBanqueActionSuccess implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.UPDATE_RETRAIT_BANQUE_SUCCESS;

  constructor(public payload: Resultat<RetraitBanque>) {
  }
}

export class UpdateRetraitBanqueActionError implements Action{
  type: RetraitBanqueActionsTypes = RetraitBanqueActionsTypes.UPDATE_RETRAIT_BANQUE_ERROR;
  constructor(public payload: Resultat<RetraitBanque>) {
  }
}
export type RetraitBanqueActions =
  GetAllRetaitBanqueAction | GetAllRetraitBanqueActionSuccess | GetAllRetraitBanqueError
  | SaveRetraitBanqueAction | SaveRetraitBanqueActionSuccess | SaveRetraitBanqueActionError
  | DeleteRetraitBanqueAction | DeleteRetraitBanqueActionSuccess | DeleteRetraitBanqueActionError
  | UpdateRetraitBanqueAction | UpdateRetraitBanqueActionSuccess | UpdateRetraitBanqueActionError
  ;
