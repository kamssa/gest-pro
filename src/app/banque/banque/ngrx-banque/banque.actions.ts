import {Action} from '@ngrx/store';
import {Resultat} from '../../../model/resultat';
import {Banque} from '../../../model/Banque';



export enum BanqueActionsTypes{
  /* Get All Banque*/
  GET_ALL_BANQUEBYENTREPRISE= '[Banque] Get All Banque by entreprise',
  GET_ALL_BANQUEBYENTREPRISE_SUCCESS= '[Banque] Get All Banque  by entreprise Success',
  GET_ALL_BANQUEBYENTREPRISE_ERROR= '[Banque] Get All Banque  by entreprise Error',

  /* save   Banque*/
  SAVE_BANQUEBYENTREPRISE = '[Banque] Save Banque  by entreprise',
  SAVE_BANQUEBYENTREPRISE_SUCCESS= '[Banque] Save Banque  by entreprise Success',
  SAVE_BANQUEBYENTREPRISE_ERROR= '[Banque] Save Banque  by entreprise Error',

  /* Delete  Banque*/
  DELETE_BANQUEBYENTREPRISE = '[Banque] Delete Banque  by entreprise',
  DELETE_BANQUEBYENTREPRISE_SUCCESS= '[Banque] Delete Banque  by entreprise Success',
  DELETE_BANQUEBYENTREPRISE_ERROR= '[Banque] Delete Banque  by entreprise Error',

  /* Update  departements*/
  UPDATE_BANQUEBYENTREPRISE = '[Banque] Update Banque  by entreprise',
  UPDATE_BANQUEBYENTREPRISE_SUCCESS= '[Banque] Update Banque  by entreprise Success',
  UPDATE_BANQUEBYENTREPRISE_ERROR= '[Banque] Update Banque  by entreprise Error',
}
/* Get All Products Actions*/

export class GetAllBanqueByEntrepriseAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.GET_ALL_BANQUEBYENTREPRISE;
  constructor(public payload: number) {
  }
}

export class GetAllBanqueByEntrepriseActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.GET_ALL_BANQUEBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Banque[]>) {
  }
}

export class GetAllBanqueByEntrepriseError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.GET_ALL_BANQUEBYENTREPRISE_ERROR;
  constructor(public payload: string) {
  }
}

/* Save Products Actions*/

export class SaveBanqueByEntrepriseAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.SAVE_BANQUEBYENTREPRISE;
  constructor(public payload: Banque) {
  }
}

export class SaveBanqueByEntrepriseActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.SAVE_BANQUEBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Banque>) {
  }
}

export class SaveBanqueByEntrepriseActionError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.SAVE_BANQUEBYENTREPRISE_ERROR;
  constructor(public payload: Resultat<Banque>) {
  }
}

/* Delete Products Actions*/

export class DeleteBanqueByEntrepriseAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.DELETE_BANQUEBYENTREPRISE;
  constructor(public payload: Banque) {
  }
}

export class DeleteBanqueByEntrepriseActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.DELETE_BANQUEBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Banque>) {
  }
}

export class DeleteBanqueByEntrepriseActionError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.DELETE_BANQUEBYENTREPRISE_ERROR;
  constructor(public payload: string) {
  }
}

/* Search Products Actions*/


/* Update Products Actions*/

export class UpdateBanqueByEntrepriseAction implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.UPDATE_BANQUEBYENTREPRISE;
  constructor(public payload: Banque) {
  }
}

export class UpdateBanqueByEntrepriseActionSuccess implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.UPDATE_BANQUEBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Banque>) {
  }
}

export class UpdateBanqueByEntrepriseActionError implements Action{
  type: BanqueActionsTypes = BanqueActionsTypes.UPDATE_BANQUEBYENTREPRISE_ERROR;
  constructor(public payload: Resultat<Banque>) {
  }
}
export type BanqueActions =
  GetAllBanqueByEntrepriseAction | GetAllBanqueByEntrepriseActionSuccess | GetAllBanqueByEntrepriseError
  | SaveBanqueByEntrepriseAction | SaveBanqueByEntrepriseActionSuccess | SaveBanqueByEntrepriseActionError
  | DeleteBanqueByEntrepriseAction | DeleteBanqueByEntrepriseActionSuccess | DeleteBanqueByEntrepriseActionError
  | UpdateBanqueByEntrepriseAction | UpdateBanqueByEntrepriseActionSuccess | UpdateBanqueByEntrepriseActionError
  ;
