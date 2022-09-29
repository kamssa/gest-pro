import {Action} from '@ngrx/store';
import {BanqueActions, BanqueActionsTypes} from './banque.actions';
import {Banque} from '../../../model/Banque';

export enum BanqueStateEnum{
  LOADING= 'Chargement',
  LOADED= 'Charger',
  ERROR= 'Erreur',
  INITIAL= 'Initialisation',
  NEW = 'Nouveau',
  EDIT= 'Editer',
  UPDATE= 'Update'
}
export interface BanqueState{
  banques: Banque[];
  errorMessage: string;
  dataState: BanqueStateEnum;
  currentBank: Banque;
}

const initState: BanqueState = {
  banques: [],
  errorMessage: '',
  dataState: BanqueStateEnum.INITIAL,
  currentBank: null
};

export function banqueReducer(state= initState, action: Action): BanqueState {
  switch (action.type) {
    case BanqueActionsTypes.GET_ALL_BANQUEBYENTREPRISE:
      return {...state, dataState: BanqueStateEnum.LOADING };
    case BanqueActionsTypes.GET_ALL_BANQUEBYENTREPRISE_SUCCESS:
      return {...state, dataState: BanqueStateEnum.LOADED, banques: (action as BanqueActions).payload['body']};
    case BanqueActionsTypes.GET_ALL_BANQUEBYENTREPRISE_ERROR:
      return {...state, dataState: BanqueStateEnum.ERROR, errorMessage: (action as BanqueActions).payload['message']};

    /* Save  Departement*/
    case BanqueActionsTypes.SAVE_BANQUEBYENTREPRISE:
      return {...state, dataState: BanqueStateEnum.LOADING };
    case BanqueActionsTypes.SAVE_BANQUEBYENTREPRISE_SUCCESS:
      const bank: Banque[] = [...state.banques];
      bank.push((action as BanqueActions).payload['body']);
      return {...state, dataState: BanqueStateEnum.LOADED, banques: bank};
    case BanqueActionsTypes.SAVE_BANQUEBYENTREPRISE_ERROR:
      return {...state, dataState: BanqueStateEnum.ERROR, errorMessage: (action as BanqueActions).payload['messages']};

    /* Delete Products*/
    case BanqueActionsTypes.DELETE_BANQUEBYENTREPRISE:
      return {...state, dataState: BanqueStateEnum.LOADING};
    case BanqueActionsTypes.DELETE_BANQUEBYENTREPRISE_SUCCESS:
      const dep: Banque = (action as BanqueActions).payload['body'];
      const index = state.banques.indexOf(dep);
      const depList = [...state.banques];
      depList.splice(index, 1);
      return {...state, dataState: BanqueStateEnum.LOADED, banques: depList};
    case BanqueActionsTypes.DELETE_BANQUEBYENTREPRISE_ERROR:
      return {...state, dataState: BanqueStateEnum.ERROR, errorMessage: (action as BanqueActions).payload['']};

    /* Update  Departement*/
    case BanqueActionsTypes.UPDATE_BANQUEBYENTREPRISE:
      return {...state, dataState: BanqueStateEnum.LOADING };
    case BanqueActionsTypes.UPDATE_BANQUEBYENTREPRISE_SUCCESS:
      const updateDepartement: Banque = (action as BanqueActions).payload['body'];
      const updatedDepartements: Banque[] = state.banques.map(d => (d.id === updateDepartement.id) ? updateDepartement :d);
      return {...state, dataState: BanqueStateEnum.LOADED, banques: updatedDepartements};
    case BanqueActionsTypes.UPDATE_BANQUEBYENTREPRISE_ERROR:
      return {...state, dataState: BanqueStateEnum.ERROR, errorMessage: (action as BanqueActions).payload['']};
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
