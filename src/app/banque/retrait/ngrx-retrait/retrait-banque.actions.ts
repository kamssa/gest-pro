import {Action} from '@ngrx/store';
import {Resultat} from '../../../model/resultat';
import {Banque} from '../../../model/Banque';



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

export class GetAllBanqueError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.GET_ALL_BANQUE_ERROR;
  constructor(public payload: string) {
  }
}

/* Save Products Actions*/

export class SaveBanqueAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.SAVE_BANQUE;
  constructor(public payload: Banque) {
  }
}

export class SaveBanqueActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.SAVE_BANQUE_SUCCESS;

  constructor(public payload: Resultat<Banque>) {
  }
}

export class SaveBanqueActionError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.SAVE_BANQUE_ERROR;
  constructor(public payload: Resultat<Banque>) {
  }
}

/* Delete Products Actions*/

export class DeleteBanqueAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.DELETE_BANQUE;
  constructor(public payload: Banque) {
  }
}

export class DeleteBanqueActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.DELETE_BANQUE_SUCCESS;

  constructor(public payload: Resultat<Banque>) {
  }
}

export class DeleteBanqueActionError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.DELETE_BANQUE_ERROR;
  constructor(public payload: string) {
  }
}

/* Search Products Actions*/


/* Update Products Actions*/

export class UpdateBanqueAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.UPDATE_BANQUE;
  constructor(public payload: Banque) {
  }
}

export class UpdateBanqueActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.UPDATE_BANQUE_SUCCESS;

  constructor(public payload: Resultat<Banque>) {
  }
}

export class UpdateBanqueActionError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.UPDATE_BANQUE_ERROR;
  constructor(public payload: Resultat<Banque>) {
  }
}
export type RetraitBanqueActions =
  GetAllBanqueAction | GetAllBanqueActionSuccess | GetAllBanqueError
  | SaveBanqueAction | SaveBanqueActionSuccess | SaveBanqueActionError
  | DeleteBanqueAction | DeleteBanqueActionSuccess | DeleteBanqueActionError
  | UpdateBanqueAction | UpdateBanqueActionSuccess | UpdateBanqueActionError
  ;
