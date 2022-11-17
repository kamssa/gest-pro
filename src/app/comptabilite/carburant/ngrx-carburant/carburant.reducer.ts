import {Action} from '@ngrx/store';
import {Prestation} from '../../../model/prestation';
import {CarburantActions, CarburantsActionsTypes} from './carburant.actions';

export enum CarburantStateEnum{
  LOADING= 'Chargement',
  LOADED= 'Charger',
  ERROR= 'Erreur',
  INITIAL= 'Initialisation',
  NEW = 'Nouveau',
  EDIT= 'Editer',
  UPDATE= 'Update'
}
export interface CarburantState{
  carburants: Prestation[];
  errorMessage: string;
  dataState: CarburantStateEnum;
  currentCarburant: Prestation;
}

const initState: CarburantState = {
  carburants: [],
  errorMessage: '',
  dataState: CarburantStateEnum.INITIAL,
  currentCarburant: null
};

export function carburantReducer(state= initState, action: Action): CarburantState {
  switch (action.type) {
    /*  GetAll carburant by entreprise */
    case CarburantsActionsTypes.GET_ALL_CARUBURANTS:
      return {...state, dataState: CarburantStateEnum.LOADING };
    case CarburantsActionsTypes.GET_ALL_CARUBURANTS_SUCCESS:
      return {...state, dataState: CarburantStateEnum.LOADED, carburants: (action as CarburantActions).payload['body']};
    case CarburantsActionsTypes.GET_ALL_CARUBURANTS_ERROR:
      return {...state, dataState: CarburantStateEnum.ERROR, errorMessage: (action as CarburantActions).payload};

    /*  GetAll carburant by vehicule */
    case CarburantsActionsTypes.GET_ALL_CARUBURANTSBYVEHICULE:
       return {...state, dataState: CarburantStateEnum.LOADING };
     case CarburantsActionsTypes.GET_ALL_CARUBURANTSBYVEHICULE_SUCCESS:
       return {...state, dataState: CarburantStateEnum.LOADED, carburants: (action as CarburantActions).payload['body']};
     case CarburantsActionsTypes.GET_ALL_CARUBURANTSBYVEHICULE_ERROR:
       return {...state, dataState: CarburantStateEnum.ERROR, errorMessage: (action as CarburantActions).payload};

     /* Save  carburant*/
    case CarburantsActionsTypes.SAVE_CARUBURANTS:
      return {...state, dataState: CarburantStateEnum.LOADING };
    case CarburantsActionsTypes.SAVE_CARUBURANTS_SUCCESS:
      const deps: Prestation[] = [...state.carburants];
      deps.push((action as CarburantActions).payload['body']);
      return {...state, dataState: CarburantStateEnum.LOADED, carburants: deps};
    case CarburantsActionsTypes.SAVE_CARUBURANTS_ERROR:
      return {...state, dataState: CarburantStateEnum.ERROR, errorMessage: (action as CarburantActions).payload['messages']};
      /* Get Selected Products*/
    case CarburantsActionsTypes.GET_SELECTED_CARUBURANTS:
      return {...state, dataState: CarburantStateEnum.LOADING };
    case CarburantsActionsTypes. GET_SELECTED_CARUBURANTS_SUCCESS:
      return {...state, dataState: CarburantStateEnum.LOADED, carburants: (action as CarburantActions).payload};
    case CarburantsActionsTypes.GET_SELECTED_CARUBURANTS_ERROR:
      return {...state, dataState: CarburantStateEnum.ERROR, errorMessage: (action as CarburantActions).payload};
    /* Delete Products*/
    case CarburantsActionsTypes.DELETE_CARUBURANTS:
      return {...state, dataState: CarburantStateEnum.LOADING};
    case CarburantsActionsTypes.DELETE_CARUBURANTS_SUCCESS:
      const dep: Prestation = (action as CarburantActions).payload['body'];
      const index = state.carburants.indexOf(dep);
      const depList = [...state.carburants];
      depList.splice(index, 1);
      return {...state, dataState: CarburantStateEnum.LOADED, carburants: depList};
    case CarburantsActionsTypes.DELETE_CARUBURANTS_ERROR:
      return {...state, dataState: CarburantStateEnum.ERROR, errorMessage: (action as CarburantActions).payload};

    /* Update  Departement*/
    case CarburantsActionsTypes.UPDATE_CARUBURANTS:
      return {...state, dataState: CarburantStateEnum.LOADING };
    case CarburantsActionsTypes.UPDATE_CARUBURANTS_SUCCESS:
      const updateDepartement: Prestation = (action as CarburantActions).payload['body'];
      const updatedDepartements: Prestation[] = state.carburants.map(d => (d.id === updateDepartement.id) ? updateDepartement :d);
      return {...state, dataState: CarburantStateEnum.LOADED, carburants: updatedDepartements};
    case CarburantsActionsTypes.UPDATE_CARUBURANTS_ERROR:
      return {...state, dataState: CarburantStateEnum.ERROR, errorMessage: (action as CarburantActions).payload};
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
