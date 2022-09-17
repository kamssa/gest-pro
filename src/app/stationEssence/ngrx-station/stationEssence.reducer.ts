import {Action} from '@ngrx/store';
import {StationEssenceActions, StationEssenceActionsTypes} from './stationEssence.actions';
import {StationEssence} from '../../model/stationEssence';

export enum StationEssenceStateEnum{
  LOADING= 'Chargement',
  LOADED= 'Charger',
  ERROR= 'Erreur',
  INITIAL= 'Initialisation',
  NEW = 'Nouveau',
  EDIT= 'Editer',
  UPDATE= 'Update'
}
export interface StationEssenceState{
  stationEssences: StationEssence[];
  errorMessage: string;
  dataState: StationEssenceStateEnum;
  currentStationEssence: StationEssence;
}

const initState: StationEssenceState = {
  stationEssences: [],
  errorMessage: '',
  dataState: StationEssenceStateEnum.INITIAL,
  currentStationEssence: null
};

export function stationEssenceReducer(state= initState, action: Action): StationEssenceState {
  switch (action.type) {
    case StationEssenceActionsTypes.GET_ALL_STATIONESSENCE:
      return {...state, dataState: StationEssenceStateEnum.LOADING };
    case StationEssenceActionsTypes.GET_ALL_STATIONESSENCE_SUCCESS:
      return {...state, dataState: StationEssenceStateEnum.LOADED, stationEssences: (action as StationEssenceActions).payload['body']};
    case StationEssenceActionsTypes.GET_ALL_STATIONESSENCE_ERROR:
      return {...state, dataState: StationEssenceStateEnum.ERROR, errorMessage: (action as StationEssenceActions).payload};

      /* Save  Departement*/
    case StationEssenceActionsTypes.SAVE_STATIONESSENCE:
      return {...state, dataState: StationEssenceStateEnum.LOADING };
    case StationEssenceActionsTypes.SAVE_STATIONESSENCE_SUCCESS:
      const veh: StationEssence[] = [...state.stationEssences];
      veh.push((action as StationEssenceActions).payload['body']);
      return {...state, dataState: StationEssenceStateEnum.LOADED, stationEssences: veh};
    case StationEssenceActionsTypes.SAVE_STATIONESSENCE_ERROR:
      return {...state, dataState: StationEssenceStateEnum.ERROR, errorMessage: (action as StationEssenceActions).payload['messages']};
      /* Get Selected Products*/
    case StationEssenceActionsTypes.GET_SELECTED_STATIONESSENCE:
      return {...state, dataState: StationEssenceStateEnum.LOADING };
    case StationEssenceActionsTypes. GET_SELECTED_STATIONESSENCE_SUCCESS:
      return {...state, dataState: StationEssenceStateEnum.LOADED, stationEssences: (action as StationEssenceActions).payload};
    case StationEssenceActionsTypes.GET_SELECTED_STATIONESSENCE_ERROR:
      return {...state, dataState: StationEssenceStateEnum.ERROR, errorMessage: (action as StationEssenceActions).payload};
    /* Delete Products*/
    case StationEssenceActionsTypes.DELETE_STATIONESSENCE:
      return {...state, dataState: StationEssenceStateEnum.LOADING};
    case StationEssenceActionsTypes.DELETE_STATIONESSENCE_SUCCESS:
      const dep: StationEssence = (action as StationEssenceActions).payload['body'];
      const index = state.stationEssences.indexOf(dep);
      const depList = [...state.stationEssences];
      depList.splice(index, 1);
      return {...state, dataState: StationEssenceStateEnum.LOADED, stationEssences: depList};
    case StationEssenceActionsTypes.DELETE_STATIONESSENCE_ERROR:
      return {...state, dataState: StationEssenceStateEnum.ERROR, errorMessage: (action as StationEssenceActions).payload};
      /* Update  Departement*/
    case StationEssenceActionsTypes.UPDATE_STATIONESSENCE:
      return {...state, dataState: StationEssenceStateEnum.LOADING };
    case StationEssenceActionsTypes.UPDATE_STATIONESSENCE_SUCCESS:
      const updateDepartement: StationEssence = (action as StationEssenceActions).payload['body'];
      const updatedDepartements: StationEssence[] = state.stationEssences.map(d => (d.id === updateDepartement.id) ? updateDepartement :d);
      return {...state, dataState: StationEssenceStateEnum.LOADED, stationEssences: updatedDepartements};
    case StationEssenceActionsTypes.UPDATE_STATIONESSENCE_ERROR:
      return {...state, dataState: StationEssenceStateEnum.ERROR, errorMessage: (action as StationEssenceActions).payload};
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
