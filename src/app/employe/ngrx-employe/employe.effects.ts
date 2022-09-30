import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';

import {catchError, map, mergeMap} from 'rxjs/operators';
import {EmployeService} from '../../service/employe.service';
import {
  DeleteEmployesActionError,
  DeleteEmployesActionSuccess,
  EmployeActionsTypes,
  EmployesActions,
  GetAllEmpoyesByEntrepriseActionError,
  GetAllEmpoyesByEntrepriseActionSuccess,
  GetSelectedEmpoyesActionError,
  GetSelectedEmpoyesActionSuccess,
  GetSuspenudEmpoyesActionSuccess,
  GetSuspenuEmpoyesActionError,
  SaveEmpoyesActionError,
  SaveEmpoyesActionSuccess,
  UpdateEmpoyesActionError,
  UpdateEmpoyesActionSuccess
} from './employe.actions';



@Injectable()
export class EmployeEffects {
  id: number;
  personne: any;
  constructor(private employeService: EmployeService,
              private effectActions: Actions) {

  }

  getAllEmployesByEntrepriseEffect: Observable<EmployesActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(EmployeActionsTypes.GET_ALL_EMPLOYESBYENTREPRISE),
      mergeMap((action: EmployesActions) => {
        return this.employeService.getEmployeByIdEntreprise(action.payload)
          .pipe(
            map((employes) =>
              new GetAllEmpoyesByEntrepriseActionSuccess(employes)),
            catchError((err) => of(new GetAllEmpoyesByEntrepriseActionError(err)))
          );
      })
    )
  );

    saveEmployesByEntrepriseEffect: Observable<EmployesActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(EmployeActionsTypes.SAVE_EMPLOYES),
      mergeMap((action: EmployesActions) => {
        return this.employeService.ajoutEmploye(action.payload)
          .pipe(
            map((employe) =>
              new SaveEmpoyesActionSuccess(employe)),
            catchError((err) => of(new SaveEmpoyesActionError(err.message)))
          );
      })
    )
  );
  /*  update employe*/
  updateEmployeByEntrepriseEffect: Observable<EmployesActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(EmployeActionsTypes.UPDATE_EMPLOYES),
      mergeMap((action: EmployesActions) => {
        return this.employeService.modifEmploye(action.payload['body'])
          .pipe(
            map((employe) =>
              new UpdateEmpoyesActionSuccess(employe)),
            catchError((err) => of(new UpdateEmpoyesActionError(err.message)))
          );
      })
    )
  );
  /*  delete employe*/

  deleteEmployeByEntrepriseEffect: Observable<EmployesActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(EmployeActionsTypes.DELETE_EMPLOYES),
      mergeMap((action: EmployesActions) => {
        return this.employeService.deleteEmployeById(action.payload['body'])
          .pipe(
            map((employe) =>
              new DeleteEmployesActionSuccess(employe)),
            catchError((err) => of(new DeleteEmployesActionError(err.message)))
          );
      })
    )
  );
  /* Get seleted employe*/
  getSelectedEmployeByEntrepriseEffect: Observable<EmployesActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(EmployeActionsTypes.GET_SELECTED_EMPLOYES),
      mergeMap((action: EmployesActions) => {
        return this.employeService.modifEmploye(action.payload)
          .pipe(
            map((employe) =>
              new GetSelectedEmpoyesActionSuccess(employe)),
            catchError((err) => of(new GetSelectedEmpoyesActionError(err.message)))
          );
      })
    )
  );
  /* Get suspendu employe*/
  getSuspenduEmployeByEntrepriseEffect: Observable<EmployesActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(EmployeActionsTypes.GET_SUSPENDU_EMPLOYES),
      mergeMap((action: EmployesActions) => {
        return this.employeService.modifEmploye(action.payload)
          .pipe(
            map((employe) =>
              new GetSuspenudEmpoyesActionSuccess(employe)),
            catchError((err) => of(new GetSuspenuEmpoyesActionError(err.message)))
          );
      })
    )
  );

}
