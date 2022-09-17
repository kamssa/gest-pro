import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';

import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  CarburantActions,
  CarburantsActionsTypes, DeleteCarburantsActionError, DeleteCarburantsActionSuccess,
  GetAllCarburantsByEntrepriseActionSuccess, SaveCarburantsActionError,
  SaveCarburantsActionSuccess, UpdateCarburantsActionError, UpdateCarburantsActionSuccess
} from './carburant.actions';
import {CarburantService} from '../../../service/carburant.service';
import {GetAllVehiculeByEntrepriseActionError} from '../../../vehicule/ngrx-vehicule/vehicule.actions';


@Injectable()
export class DepartementEffects {
  id: number;
  personne: any;
  constructor(private carburantService: CarburantService,
              private effectActions: Actions) {

  }

  getAllCarburantsByEntrepriseEffect: Observable<CarburantActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(CarburantsActionsTypes.GET_ALL_CARUBURANTSBYENTREPRISE),
      mergeMap((action: CarburantActions) => {
        return this.carburantService.getCarburantByIdEntreprise(action.payload)
          .pipe(
            map((deparments) =>
              new GetAllCarburantsByEntrepriseActionSuccess(deparments)),
            catchError((err) => of(new GetAllVehiculeByEntrepriseActionError(err)))
          );
      })
    )
  );

    saveCarburantsByEntrepriseEffect: Observable<CarburantActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(CarburantsActionsTypes.SAVE_CARUBURANTS),
      mergeMap((action: CarburantActions) => {
        return this.carburantService.ajoutCarburatByVehicule(action.payload)
          .pipe(
            map((carburant) =>
              new SaveCarburantsActionSuccess(carburant)),
            catchError((err) => of(new SaveCarburantsActionError(err.message)))
          );
      })
    )
  );
  /*  update departeent*/
  updateCarburantsByEntrepriseEffect: Observable<CarburantActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(CarburantsActionsTypes.UPDATE_CARUBURANTS),
      mergeMap((action: CarburantActions) => {
        return this.carburantService.modifCarburantByVehicule(action.payload)
          .pipe(
            map((carburant) =>
              new UpdateCarburantsActionSuccess(carburant)),
            catchError((err) => of(new UpdateCarburantsActionError(err.message)))
          );
      })
    )
  );
  deleteCarburantsByEntrepriseEffect: Observable<CarburantActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(CarburantsActionsTypes.DELETE_CARUBURANTS),
      mergeMap((action: CarburantActions) => {
        return this.carburantService.supprimerCarburantByVehicule(action.payload.id)
          .pipe(
            map(() => new DeleteCarburantsActionSuccess(action.payload)),
            catchError((err) => of(new DeleteCarburantsActionError(err.message)))
          );
      })
    )
  );

}
