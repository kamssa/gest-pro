import {Injectable} from '@angular/core';
import {DepService} from '../../service/dep.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  DeleteDepartementActionError,
  DeleteDepartementActionSuccess,
  DepartementActions,
  DepartementsActionsTypes,
  GetAllDepartementByEntrepriseActionError,
  GetAllDepartementByEntrepriseActionSuccess,
  NewDepartementActionSuccess,
  SaveDepartementActionError,
  SaveDepartementActionSuccess, UpdateDepartementActionError,
  UpdateDepartementActionSuccess
} from './dep.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';


@Injectable()
export class DepartementEffects {
  id: number;
  personne: any;
  constructor(private depService: DepService,
              private effectActions: Actions) {

  }

  getAllDepartementsByEntrepriseEffect: Observable<DepartementActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(DepartementsActionsTypes.GET_ALL_DEPARTEMENTSBYENTREPRISE),
      mergeMap((action: DepartementActions) => {
        return this.depService.getDepByIdEntreprise(action.payload)
          .pipe(
            map((deparments) =>
              new GetAllDepartementByEntrepriseActionSuccess(deparments)),
            catchError((err) => of(new GetAllDepartementByEntrepriseActionError(err.message)))
          );
      })
    )
  );
  NewDepartementsEffect: Observable<DepartementActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(DepartementsActionsTypes.NEW_DEPARTEMENTS),
      map((action: DepartementActions) => {
        return new NewDepartementActionSuccess({});

      })
    )
  );
    saveDepartementsByEntrepriseEffect: Observable<DepartementActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(DepartementsActionsTypes.SAVE_DEPARTEMENTS),
      mergeMap((action: DepartementActions) => {
        return this.depService.ajoutDepartement(action.payload)
          .pipe(
            map((deparment) =>
              new SaveDepartementActionSuccess(deparment)),
            catchError((err) => of(new SaveDepartementActionError(err.message)))
          );
      })
    )
  );
  /*  update departeent*/
  updateDepartementsByEntrepriseEffect: Observable<DepartementActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(DepartementsActionsTypes.UPDATE_DEPARTEMENTS),
      mergeMap((action: DepartementActions) => {
        return this.depService.modifDepartement(action.payload)
          .pipe(
            map((deparment) =>
              new UpdateDepartementActionSuccess(deparment)),
            catchError((err) => of(new UpdateDepartementActionError(err.message)))
          );
      })
    )
  );
  deleteDepartementsByEntrepriseEffect: Observable<DepartementActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(DepartementsActionsTypes.DELETE_DEPARTEMENTS),
      mergeMap((action: DepartementActions) => {
        return this.depService.supprimerDepartement(action.payload.id)
          .pipe(
            map(() => new DeleteDepartementActionSuccess(action.payload)),
            catchError((err) => of(new DeleteDepartementActionError(err.message)))
          );
      })
    )
  );
  
}
