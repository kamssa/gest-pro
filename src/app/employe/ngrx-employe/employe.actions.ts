import {Action} from '@ngrx/store';
import {Resultat} from '../../model/resultat';
import {Employe} from '../../model/Employe';


export enum EmployeActionsTypes {
  /* Get All EMPLOYES*/
  GET_ALL_EMPLOYESBYENTREPRISE= '[Empoyes] Get All Empoyes by entreprise',
  GET_ALL_EMPLOYESBYENTREPRISE_SUCCESS= '[Empoyes] Get All Empoyes by entreprise Success',
  GET_ALL_EMPLOYESBYENTREPRISE_ERROR= '[Empoyes] Get All Empoyes by entreprise Error',

  /* Get activated EMPLOYES*/
  GET_SELECTED_EMPLOYES= '[Empoyes] Get  Empoyes Activated',
  GET_SELECTED_EMPLOYES_SUCCESS= '[Empoyes] Get  Empoyes Activated Success',
  GET_SELECTED_EMPLOYES_ERROR= '[Empoyes] Get Activated Activated Empoyes Error',

  /* Get suspendu EMPLOYES*/
  GET_SUSPENDU_EMPLOYES= '[Empoyes] Get suspendu employes',
  GET_SUSPEND_EMPLOYES_SUCCESS= '[Empoyes] Get suspendu employes Success',
  GET_SUSPEND_EMPLOYES_ERROR= '[Empoyes] Get suspendu employes Error',
  /* save   EMPLOYES*/
  SAVE_EMPLOYES = '[Empoyes] Save Empoyes',
  SAVE_EMPLOYES_SUCCESS= '[Empoyes] Save Empoyes Success',
  SAVE_EMPLOYES_ERROR= '[Empoyes] Save Empoyes Error',
  /* Delete  departements*/
  DELETE_EMPLOYES= '[Empoyes] Delete Empoyes',
  DELETE_EMPLOYES_SUCCESS= '[Empoyes] Delete Empoyes Success',
  DELETE_EMPLOYES_ERROR= '[Empoyes] Delete Empoyes Error',

  /* Search  employés*/
  SEARCH_EMPLOYESBYENTREPRISE= '[Empoyes] search Empoyes by entreprise',
  SEARCH_EMPLOYESBYENTREPRISE_SUCCESS= '[Empoyes] search Empoyes by entreprise Success',
  SEARCH_EMPLOYESBYENTREPRISE_ERROR= '[Empoyes] search Empoyes by entreprise Error',
  /* Update  departements*/
  UPDATE_EMPLOYES = '[Empoyes] Update Empoyes',
  UPDATE_EMPLOYES_SUCCESS = '[Empoyes] Update Empoyes Success',
  UPDATE_EMPLOYES_ERROR= '[Empoyes] Update Empoyes Error',
}
/* Get All Empoyes Actions*/

export class GetAllEmpoyesByEntrepriseAction implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_ALL_EMPLOYESBYENTREPRISE;
  constructor(public payload: any) {
  }
}

export class GetAllEmpoyesByEntrepriseActionSuccess implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_ALL_EMPLOYESBYENTREPRISE_SUCCESS;

  constructor(public payload: Resultat<Employe[]>) {
  }
}

export class GetAllEmpoyesByEntrepriseActionError implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_ALL_EMPLOYESBYENTREPRISE_ERROR;
  constructor(public payload: string ) {
  }
}

/* Save Products Actions*/

export class SaveEmpoyesAction implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.SAVE_EMPLOYES;
  constructor(public payload: Employe) {
  }
}

export class SaveEmpoyesActionSuccess implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.SAVE_EMPLOYES_SUCCESS;

  constructor(public payload: Resultat<Employe>) {
  }
}

export class SaveEmpoyesActionError implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.SAVE_EMPLOYES_ERROR;
  constructor(public payload: Resultat<Employe>) {
  }
}
/* Get activated employe Actions*/

export class GetSelectedEmpoyesAction implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_SELECTED_EMPLOYES;
  constructor(public payload: any) {
  }
}

export class GetSelectedEmpoyesActionSuccess implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_SELECTED_EMPLOYES_SUCCESS;
  constructor(public payload: Resultat<Employe>) {
  }
}

export class GetSelectedEmpoyesActionError implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_SELECTED_EMPLOYES_ERROR;
  constructor(public payload: string) {
  }
}
/* Get suspendu employe Actions*/

export class GetSuspenuEmpoyesAction implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_SUSPENDU_EMPLOYES;
  constructor(public payload: Employe) {
  }
}

export class GetSuspenudEmpoyesActionSuccess implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_SUSPEND_EMPLOYES_SUCCESS;
  constructor(public payload: Resultat<Employe>) {
  }
}

export class GetSuspenuEmpoyesActionError implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.GET_SUSPEND_EMPLOYES_ERROR;
  constructor(public payload: string) {
  }
}
/* Delete Products Actions*/

export class DeleteEmployesAction implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.DELETE_EMPLOYES;
  constructor(public payload: any) {
  }
}

export class DeleteEmployesActionSuccess implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.DELETE_EMPLOYES_SUCCESS;

  constructor(public payload: Resultat<Employe>) {
  }
}

export class DeleteEmployesActionError implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.DELETE_EMPLOYES_ERROR;
  constructor(public payload: string) {
  }
}

/* Search Employe Actions*/
export class SearchEmpoyesByEntrepriseAction implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.UPDATE_EMPLOYES;
  constructor(public payload: Employe) {
  }
}

export class  SearchEmpoyesByEntrepriseActionSuccess implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.UPDATE_EMPLOYES_SUCCESS;

  constructor(public payload: Resultat<Employe>) {
  }
}

export class  SearchEmpoyesByEntrepriseActionError implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.UPDATE_EMPLOYES_ERROR;
  constructor(public payload: Resultat<Employe>) {
  }
}

/* Update Products Actions*/

export class UpdateEmpoyesAction implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.UPDATE_EMPLOYES;
  constructor(public payload: Employe) {
  }
}

export class UpdateEmpoyesActionSuccess implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.UPDATE_EMPLOYES_SUCCESS;

  constructor(public payload: Resultat<Employe>) {
  }
}

export class UpdateEmpoyesActionError implements Action{
  type: EmployeActionsTypes = EmployeActionsTypes.UPDATE_EMPLOYES_ERROR;
  constructor(public payload: Resultat<Employe>) {
  }
}
export type EmployesActions =
  GetAllEmpoyesByEntrepriseAction | GetAllEmpoyesByEntrepriseActionSuccess | GetAllEmpoyesByEntrepriseActionError
  | GetSelectedEmpoyesAction | GetSelectedEmpoyesActionSuccess | GetSelectedEmpoyesActionError
  | GetSuspenuEmpoyesAction | GetSuspenudEmpoyesActionSuccess | GetSuspenuEmpoyesActionError
  | SaveEmpoyesAction | SaveEmpoyesActionSuccess | SaveEmpoyesActionError
  | DeleteEmployesAction | DeleteEmployesActionSuccess | DeleteEmployesActionError
  | UpdateEmpoyesAction | UpdateEmpoyesActionSuccess | UpdateEmpoyesActionError
  ;
