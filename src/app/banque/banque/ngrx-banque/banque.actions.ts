import {Action} from '@ngrx/store';
import {Resultat} from '../../../model/resultat';
import {Banque} from '../../../model/Banque';



export enum BanqueActionsTypes{
  /* Get All Banque*/
  GET_ALL_BANQUE= '[Banque] Get All Banque ',
  GET_ALL_BANQUE_SUCCESS= '[Banque] Get All Banque  Success',
  GET_ALL_BANQUE_ERROR= '[Banque] Get All Banque  Error',

  /* save   Banque*/
  SAVE_BANQUE = '[Banque] Save Banque',
  SAVE_BANQUE_SUCCESS= '[Banque] Save Banque Success',
  SAVE_BANQUE_ERROR= '[Banque] Save Banque Error',

  /* Delete  Banque*/
  DELETE_BANQUE = '[Banque] Delete Banque',
  DELETE_BANQUE_SUCCESS= '[Banque] Delete Banque Success',
  DELETE_BANQUE_ERROR= '[Banque] Delete Banque Error',

  /* Update  departements*/
  UPDATE_BANQUE = '[Banque] Update Banque',
  UPDATE_BANQUE_SUCCESS= '[Banque] Update Banque Success',
  UPDATE_BANQUE_ERROR= '[Banque] Update Banque Error',
}
/* Get All Products Actions*/

export class GetAllBanqueAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.GET_ALL_BANQUE;
  constructor(public payload: number) {
  }
}

export class GetAllBanqueActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.GET_ALL_BANQUE_SUCCESS;

  constructor(public payload: Resultat<Banque[]>) {
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
export type BanqueActions =
  GetAllBanqueAction | GetAllBanqueActionSuccess | GetAllBanqueError
  | SaveBanqueAction | SaveBanqueActionSuccess | SaveBanqueActionError
  | DeleteBanqueAction | DeleteBanqueActionSuccess | DeleteBanqueActionError
  | UpdateBanqueAction | UpdateBanqueActionSuccess | UpdateBanqueActionError
  ;
