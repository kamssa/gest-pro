import {Action} from '@ngrx/store';
import {Employe} from '../../model/Employe';
import {EmployeActionsTypes, EmployesActions} from './employe.actions';

export enum EmployeStateEnum{
  LOADING= 'Chargement',
  LOADED= 'Charger',
  ERROR= 'Erreur',
  INITIAL= 'Initialisation',
  EDIT= 'Editer',
}
export interface EmployesState{
  employes: Employe[];
  errorMessage: string;
  dataState: EmployeStateEnum;
  currentEmploye: Employe;
}

const initState: EmployesState = {
  employes: [],
  errorMessage: '',
  dataState: EmployeStateEnum.INITIAL,
  currentEmploye: null
};

export function employeReducer(state= initState, action: Action): EmployesState {
  switch (action.type) {

    /* Get all employe par entreprise*/
    case EmployeActionsTypes.GET_ALL_EMPLOYESBYENTREPRISE:
      return {...state, dataState: EmployeStateEnum.LOADING };
    case EmployeActionsTypes.GET_ALL_EMPLOYESBYENTREPRISE_SUCCESS:
      return {...state, dataState: EmployeStateEnum.LOADED, employes: (action as EmployesActions).payload['body']};
    case EmployeActionsTypes.GET_ALL_EMPLOYESBYENTREPRISE_ERROR:
      return {...state, dataState: EmployeStateEnum.ERROR, errorMessage: (action as EmployesActions).payload};

      /* Save  employé*/
    case EmployeActionsTypes.SAVE_EMPLOYES:
      return {...state, dataState: EmployeStateEnum.LOADING };
    case EmployeActionsTypes.SAVE_EMPLOYES_SUCCESS:
      const empls: Employe[] = [...state.employes];
      empls.push((action as EmployesActions).payload['body']);
      return {...state, dataState: EmployeStateEnum.LOADED, employes: empls};
    case EmployeActionsTypes.SAVE_EMPLOYES_ERROR:
      return {...state, dataState: EmployeStateEnum.ERROR, errorMessage: (action as EmployesActions).payload['messages']};

      /* Get Activated employé*/
    case EmployeActionsTypes.GET_SELECTED_EMPLOYES:
      return {...state, dataState: EmployeStateEnum.LOADING };
    case EmployeActionsTypes.GET_SELECTED_EMPLOYES_SUCCESS:
      const updateEmploye: Employe = (action as EmployesActions).payload['body'];
      const updatedEmployes: Employe[] = state.employes.map(d => (d.id === updateEmploye.id) ? updateEmploye :d);
      return {...state, dataState: EmployeStateEnum.LOADED, employes: updatedEmployes};
    case EmployeActionsTypes.GET_SELECTED_EMPLOYES_ERROR:
      return {...state, dataState: EmployeStateEnum.ERROR, errorMessage: (action as EmployesActions).payload};

    /* Get suspendu employé*/
    case EmployeActionsTypes.GET_SUSPENDU_EMPLOYES:
      return {...state, dataState: EmployeStateEnum.LOADING };
    case EmployeActionsTypes.GET_SUSPEND_EMPLOYES_SUCCESS:
      const suspenduEmploye: Employe = (action as EmployesActions).payload['body'];
      const suspenduEmployes: Employe[] = state.employes.map(d => (d.id === suspenduEmploye.id) ? suspenduEmploye : d);
      return {...state, dataState: EmployeStateEnum.LOADED, employes: suspenduEmployes};
    case EmployeActionsTypes.GET_SUSPEND_EMPLOYES_ERROR:
      return {...state, dataState: EmployeStateEnum.ERROR, errorMessage: (action as EmployesActions).payload};
      /* Delete employé*/
    case EmployeActionsTypes.DELETE_EMPLOYES:
      return {...state, dataState: EmployeStateEnum.LOADING};
    case EmployeActionsTypes.DELETE_EMPLOYES_SUCCESS:
      const dep: Employe = (action as EmployesActions).payload['body'];
      const index = state.employes.indexOf(dep);
      const depList = [...state.employes];
      depList.splice(index, 1);
      return {...state, dataState: EmployeStateEnum.LOADED, employes: depList};
    case EmployeActionsTypes.DELETE_EMPLOYES_ERROR:
      return {...state, dataState: EmployeStateEnum.ERROR, errorMessage: (action as EmployesActions).payload};

    /* Update  employé*/
    case EmployeActionsTypes.UPDATE_EMPLOYES:
      return {...state, dataState: EmployeStateEnum.LOADING };
    case EmployeActionsTypes.UPDATE_EMPLOYES_SUCCESS:
      const updateDepartement: Employe = (action as EmployesActions).payload;
      const updatedDepartements: Employe[] = state.employes.map(d => (d.id === updateDepartement.id) ? updateDepartement : d);
      return {...state, dataState: EmployeStateEnum.LOADED, employes: updatedDepartements};
    case EmployeActionsTypes.UPDATE_EMPLOYES_ERROR:
      return {...state, dataState: EmployeStateEnum.ERROR, errorMessage: (action as EmployesActions).payload};
     /*  Search employé*/
    case EmployeActionsTypes.SEARCH_EMPLOYESBYENTREPRISE:
      return {...state, dataState: EmployeStateEnum.LOADING };
    case EmployeActionsTypes.SEARCH_EMPLOYESBYENTREPRISE_SUCCESS:
      return {...state, dataState: EmployeStateEnum.LOADED, employes: (action as EmployesActions).payload['body']};
    case EmployeActionsTypes.SEARCH_EMPLOYESBYENTREPRISE_ERROR:
      return {...state, dataState: EmployeStateEnum.ERROR, errorMessage: (action as EmployesActions).payload['messages']};
      default : return {...state};
  }
}
