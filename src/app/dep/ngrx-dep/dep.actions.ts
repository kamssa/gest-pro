import {Action} from '@ngrx/store';
import {Departement} from '../../model/Departement';
import {Resultat} from '../../model/resultat';


export enum DepartementsActionsTypes{
  /* Get All departements*/
  GET_ALL_DEPARTEMENTSBYENTREPRISE= '[Departements] Get All departements by entreprise',
  GET_ALL_DEPARTEMENTSBYENTREPRISE_SUCCESS= '[Departements] Get All departements by entreprise Success',
  GET_ALL_DEPARTEMENTSBYENTREPRISE_ERROR= '[Departements] Get All departements by entreprise Error',

  /* Get Selected epartements*/
  GET_SELECTED_DEPARTEMENTS= '[Departements] Get Selected departements',
  GET_SELECTED_DEPARTEMENTS_SUCCESS= '[Departements] Get Selected departements Success',
  GET_SELECTED_DEPARTEMENTS_ERROR= '[Departements] Get Selected departements Error',

  /* new  departements*/
  NEW_DEPARTEMENTS = '[Departements] New departements',
  NEW_DEPARTEMENTS_SUCCESS= '[Departements] New departements Success',
  NEW_DEPARTEMENTS_ERROR= '[Departements] New departements Error',
  /* save   departements*/
  SAVE_DEPARTEMENTS = '[Departements] Save departements',
  SAVE_DEPARTEMENTS_SUCCESS= '[Departements] Save departements Success',
  SAVE_DEPARTEMENTS_ERROR= '[Departements] Save departements Error',
  /* Delete  departements*/
  DELETE_DEPARTEMENTS = '[Departement] Delete departements',
  DELETE_DEPARTEMENTS_SUCCESS= '[Departement] Delete departements Success',
  DELETE_DEPARTEMENTS_ERROR= '[Departement] Delete departements Error',
  /* Edit   departements*/
  EDIT_DEPARTEMENTS = '[Departement] Edit departements',
  EDIT_DEPARTEMENTS_SUCCESS= '[Departement] Edit departements Success',
  EDIT_DEPARTEMENTS_ERROR= '[Departement] Edit departements Error',
  /* Search  departements*/
  SEARCH_DEPARTEMENTS = '[Departement] Search departements',
  SEARCH_DEPARTEMENTS_SUCCESS= '[Departement] Search departements Success',
  SEARCH_DEPARTEMENTS_ERROR= '[Departement] Search departements Error',
  /* Update  departements*/
  UPDATE_DEPARTEMENTS = '[Departement] Update departements',
  UPDATE_DEPARTEMENTS_SUCCESS= '[Departement] Update departements Success',
  UPDATE_DEPARTEMENTS_ERROR= '[Departement] Update departements Error',
}
/* Get All Products Actions*/

export class GetAllDepartementByEntrepriseAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.GET_ALL_DEPARTEMENTSBYENTREPRISE;
  constructor(public payload: any) {
  }
}

export class GetAllDepartementByEntrepriseActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.GET_ALL_DEPARTEMENTSBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Departement[]>) {
  }
}

export class GetAllDepartementByEntrepriseActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.GET_ALL_DEPARTEMENTSBYENTREPRISE_ERROR;
  constructor(public payload: number) {
  }
}
/* New Products Actions*/

export class NewDepartementAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.NEW_DEPARTEMENTS;
  constructor(public payload: any) {
  }
}

export class NewDepartementActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.NEW_DEPARTEMENTS_SUCCESS;
  constructor(public payload: any) {
  }
}

export class NewDepartementActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.NEW_DEPARTEMENTS_ERROR;
  constructor(public payload: string) {
  }
}
/* Save Products Actions*/

export class SaveDepartementAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.SAVE_DEPARTEMENTS;
  constructor(public payload: Departement) {
  }
}

export class SaveDepartementActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.SAVE_DEPARTEMENTS_SUCCESS;

  constructor(public payload: Resultat<Departement>) {
  }
}

export class SaveDepartementActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.SAVE_DEPARTEMENTS_ERROR;
  constructor(public payload: Resultat<Departement>) {
  }
}
/* Get Selected Products Actions*/

export class GetSelectedDepartementAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.GET_SELECTED_DEPARTEMENTS;
  constructor(public payload: any) {
  }
}

export class GetSelectedDepartementActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.GET_SELECTED_DEPARTEMENTS_SUCCESS;
  constructor(public payload: Departement[]) {
  }
}

export class GetSelectedDepartementActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.GET_SELECTED_DEPARTEMENTS_ERROR;
  constructor(public payload: string) {
  }
}
/* Delete Products Actions*/

export class DeleteDepartementAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.DELETE_DEPARTEMENTS;
  constructor(public payload: Departement) {
  }
}

export class DeleteDepartementActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.DELETE_DEPARTEMENTS_SUCCESS;

  constructor(public payload: Resultat<Departement>) {
  }
}

export class DeleteDepartementActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.DELETE_DEPARTEMENTS_ERROR;
  constructor(public payload: string) {
  }
}
/* Edit Products Actions*/

export class EditDepartementAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.EDIT_DEPARTEMENTS;
  constructor(public payload: Departement) {
  }
}

export class EditDepartementActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.EDIT_DEPARTEMENTS_SUCCESS;

  constructor(public payload: Resultat<Departement>) {
  }
}

export class EditDepartementActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.EDIT_DEPARTEMENTS_ERROR;
  constructor(public payload: string) {
  }
}
/* Search Products Actions*/

export class SearchDepartementAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.SEARCH_DEPARTEMENTS;
  constructor(public payload: string , public payloaded: string) {
  }
}

export class SearchDepartementActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.SEARCH_DEPARTEMENTS_SUCCESS;

  constructor(public payload: Array<Departement>) {
  }
}

export class SearchDepartementActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.SEARCH_DEPARTEMENTS_ERROR;
  constructor(public payload: string) {
  }
}
/* Update Products Actions*/

export class UpdateDepartementAction implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.UPDATE_DEPARTEMENTS;
  constructor(public payload: Departement) {
  }
}

export class UpdateDepartementActionSuccess implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.UPDATE_DEPARTEMENTS_SUCCESS;

  constructor(public payload: Resultat<Departement>) {
  }
}

export class UpdateDepartementActionError implements Action{
  type: DepartementsActionsTypes = DepartementsActionsTypes.UPDATE_DEPARTEMENTS_ERROR;
  constructor(public payload: Resultat<Departement>) {
  }
}
export type DepartementActions =
  GetAllDepartementByEntrepriseAction | GetAllDepartementByEntrepriseActionSuccess | GetAllDepartementByEntrepriseActionError
  | GetSelectedDepartementAction | GetSelectedDepartementActionSuccess | GetSelectedDepartementActionError
  | NewDepartementAction | NewDepartementActionSuccess | NewDepartementActionError
  | SaveDepartementAction | SaveDepartementActionSuccess | SaveDepartementActionError
  | DeleteDepartementAction | DeleteDepartementActionSuccess | DeleteDepartementActionError
  | EditDepartementAction | EditDepartementActionSuccess | EditDepartementActionError
  | SearchDepartementAction | SearchDepartementActionSuccess | SearchDepartementActionError
  | UpdateDepartementAction | UpdateDepartementActionSuccess | UpdateDepartementActionError
  ;
