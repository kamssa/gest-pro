import {Departement} from '../../model/Departement';
import {Action} from '@ngrx/store';
import {DepartementActions, DepartementsActionsTypes} from './dep.actions';

export enum DepartementStateEnum{
  LOADING= 'Chargement',
  LOADED= 'Charger',
  ERROR= 'Erreur',
  INITIAL= 'Initialisation',
  NEW = 'Nouveau',
  EDIT= 'Editer',
  UPDATE= 'Update'
}
export interface DepartementState{
  departements: Departement[];
  errorMessage: string;
  dataState: DepartementStateEnum;
  currentDep: Departement;
}

const initState: DepartementState = {
  departements: [],
  errorMessage: '',
  dataState: DepartementStateEnum.INITIAL,
  currentDep: null
};

export function departementReducer(state= initState, action: Action): DepartementState {
  switch (action.type) {
    case DepartementsActionsTypes.GET_ALL_DEPARTEMENTSBYENTREPRISE:
      return {...state, dataState: DepartementStateEnum.LOADING };
    case DepartementsActionsTypes.GET_ALL_DEPARTEMENTSBYENTREPRISE_SUCCESS:
      return {...state, dataState: DepartementStateEnum.LOADED, departements: (action as DepartementActions).payload['body']};
    case DepartementsActionsTypes.GET_ALL_DEPARTEMENTSBYENTREPRISE_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload};
    /* New  Departement*/
   /* case DepartementsActionsTypes.NEW_DEPARTEMENTS:
      return {...state, dataState: DepartementStateEnum.LOADING };
    case DepartementsActionsTypes. NEW_DEPARTEMENTS_SUCCESS:
      return {...state, dataState: DepartementStateEnum.NEW};
    case DepartementsActionsTypes.NEW_DEPARTEMENTS_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload};*/
    /* Save  Departement*/
    case DepartementsActionsTypes.SAVE_DEPARTEMENTS:
      return {...state, dataState: DepartementStateEnum.LOADING };
    case DepartementsActionsTypes.SAVE_DEPARTEMENTS_SUCCESS:
      const deps: Departement[] = [...state.departements];
      deps.push((action as DepartementActions).payload['body']);
      return {...state, dataState: DepartementStateEnum.LOADED, departements: deps};
    case DepartementsActionsTypes.SAVE_DEPARTEMENTS_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload['messages']};
      /* Get Selected Products*/
    case DepartementsActionsTypes.GET_SELECTED_DEPARTEMENTS:
      return {...state, dataState: DepartementStateEnum.LOADING };
    case DepartementsActionsTypes. GET_SELECTED_DEPARTEMENTS_SUCCESS:
      return {...state, dataState: DepartementStateEnum.LOADED, departements: (action as DepartementActions).payload};
    case DepartementsActionsTypes.GET_SELECTED_DEPARTEMENTS_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload};
    /* Delete Products*/
    case DepartementsActionsTypes.DELETE_DEPARTEMENTS:
      return {...state, dataState: DepartementStateEnum.LOADING};
    case DepartementsActionsTypes.DELETE_DEPARTEMENTS_SUCCESS:
      const dep: Departement = (action as DepartementActions).payload['body'];
      const index = state.departements.indexOf(dep);
      const depList = [...state.departements];
      depList.splice(index, 1);
      return {...state, dataState: DepartementStateEnum.LOADED, departements: depList};
    case DepartementsActionsTypes.DELETE_DEPARTEMENTS_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload};
    /* Edit  Departement*/
    case DepartementsActionsTypes.EDIT_DEPARTEMENTS:
      return {...state, dataState: DepartementStateEnum.LOADING };
    case DepartementsActionsTypes.EDIT_DEPARTEMENTS_SUCCESS:
      return {...state, dataState: DepartementStateEnum.LOADED, currentDep: (action as DepartementActions).payload};
    case DepartementsActionsTypes.EDIT_DEPARTEMENTS_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload};
    /* Update  Departement*/
    case DepartementsActionsTypes.UPDATE_DEPARTEMENTS:
      return {...state, dataState: DepartementStateEnum.LOADING };
    case DepartementsActionsTypes.UPDATE_DEPARTEMENTS_SUCCESS:
      const updateDepartement: Departement = (action as DepartementActions).payload['body'];
      const updatedDepartements: Departement[] = state.departements.map(d => (d.id === updateDepartement.id) ? updateDepartement :d);
      return {...state, dataState: DepartementStateEnum.LOADED, departements: updatedDepartements};
    case DepartementsActionsTypes.UPDATE_DEPARTEMENTS_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload};
      /* Search Products*/
   /* case DepartementsActionsTypes.SEARCH_DEPARTEMENTS:
      return {...state, dataState: DepartementStateEnum.LOADING };
    case DepartementsActionsTypes. SEARCH_DEPARTEMENTS_SUCCESS:
      return {...state, dataState: DepartementStateEnum.LOADED, departements: (action as DepartementActions).payload};
    case DepartementsActionsTypes.SEARCH_DEPARTEMENTS_ERROR:
      return {...state, dataState: DepartementStateEnum.ERROR, errorMessage: (action as DepartementActions).payload};*/
      default : return {...state};
  }
}
