import {Action} from '@ngrx/store';
import {Vehicule} from '../../model/vehicule';
import {VehiculeActions, VehiculesActionsTypes} from './vehicule.actions';

export enum VehiculeStateEnum{
  LOADING= 'Chargement',
  LOADED= 'Charger',
  ERROR= 'Erreur',
  INITIAL= 'Initialisation',
  NEW = 'Nouveau',
  EDIT= 'Editer',
  UPDATE= 'Update'
}
export interface VehiculeState{
  vehicules: Vehicule[];
  errorMessage: string;
  dataState: VehiculeStateEnum;
  currentVehicule: Vehicule;
}

const initState: VehiculeState = {
  vehicules: [],
  errorMessage: '',
  dataState: VehiculeStateEnum.INITIAL,
  currentVehicule: null
};

export function vehiculeReducer(state= initState, action: Action): VehiculeState {
  switch (action.type) {
    case VehiculesActionsTypes.GET_ALL_VEHICULESBYENTREPRISE:
      return {...state, dataState: VehiculeStateEnum.LOADING };
    case VehiculesActionsTypes.GET_ALL_VEHICULESBYENTREPRISE_SUCCESS:
      return {...state, dataState: VehiculeStateEnum.LOADED, vehicules: (action as VehiculeActions).payload['body']};
    case VehiculesActionsTypes.GET_ALL_VEHICULESBYENTREPRISE_ERROR:
      return {...state, dataState: VehiculeStateEnum.ERROR, errorMessage: (action as VehiculeActions).payload};

      /* Save  Departement*/
    case VehiculesActionsTypes.SAVE_VEHICULES:
      return {...state, dataState: VehiculeStateEnum.LOADING };
    case VehiculesActionsTypes.SAVE_VEHICULES_SUCCESS:
      const veh: Vehicule[] = [...state.vehicules];
      veh.push((action as VehiculeActions).payload['body']);
      return {...state, dataState: VehiculeStateEnum.LOADED, vehicules: veh};
    case VehiculesActionsTypes.SAVE_VEHICULES_ERROR:
      return {...state, dataState: VehiculeStateEnum.ERROR, errorMessage: (action as VehiculeActions).payload['messages']};
      /* Get Selected Products*/
    case VehiculesActionsTypes.GET_SELECTED_VEHICULES:
      return {...state, dataState: VehiculeStateEnum.LOADING };
    case VehiculesActionsTypes. GET_SELECTED_VEHICULES_SUCCESS:
      return {...state, dataState: VehiculeStateEnum.LOADED, vehicules: (action as VehiculeActions).payload};
    case VehiculesActionsTypes.GET_SELECTED_VEHICULES_ERROR:
      return {...state, dataState: VehiculeStateEnum.ERROR, errorMessage: (action as VehiculeActions).payload};
    /* Delete Products*/
    case VehiculesActionsTypes.DELETE_VEHICULES:
      return {...state, dataState: VehiculeStateEnum.LOADING};
    case VehiculesActionsTypes.DELETE_VEHICULES_SUCCESS:
      const dep: Vehicule = (action as VehiculeActions).payload['body'];
      const index = state.vehicules.indexOf(dep);
      const depList = [...state.vehicules];
      depList.splice(index, 1);
      return {...state, dataState: VehiculeStateEnum.LOADED, vehicules: depList};
    case VehiculesActionsTypes.DELETE_VEHICULES_ERROR:
      return {...state, dataState: VehiculeStateEnum.ERROR, errorMessage: (action as VehiculeActions).payload};
      /* Update  Departement*/
    case VehiculesActionsTypes.UPDATE_VEHICULES:
      return {...state, dataState: VehiculeStateEnum.LOADING };
    case VehiculesActionsTypes.UPDATE_VEHICULES_SUCCESS:
      const updateDepartement: Vehicule = (action as VehiculeActions).payload['body'];
      const updatedDepartements: Vehicule[] = state.vehicules.map(d => (d.id === updateDepartement.id) ? updateDepartement :d);
      return {...state, dataState: VehiculeStateEnum.LOADED, vehicules: updatedDepartements};
    case VehiculesActionsTypes.UPDATE_VEHICULES_ERROR:
      return {...state, dataState: VehiculeStateEnum.ERROR, errorMessage: (action as VehiculeActions).payload};
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
