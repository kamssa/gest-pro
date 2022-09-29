import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';

import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  CarburantActions,
  CarburantsActionsTypes,
  DeleteCarburantsActionError,
  DeleteCarburantsActionSuccess, GetAllCarburantsActionError, GetAllCarburantsActionSuccess,
  GetAllCarburantsByVehiculeActionError,
  GetAllCarburantsByVehiculeActionSuccess,
  SaveCarburantsActionError,
  SaveCarburantsActionSuccess,
  UpdateCarburantsActionError,
  UpdateCarburantsActionSuccess
} from './carburant.actions';
import {CarburantService} from '../../../service/carburant.service';


@Injectable()
export class CarburantEffects {
  id: number;
  personne: any;
  constructor(private carburantService: CarburantService,
              private effectActions: Actions) {

  }
  /*  get All carburant by entreprise */

  getAllCarburantsEffect: Observable<CarburantActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(CarburantsActionsTypes.GET_ALL_CARUBURANTS),
      mergeMap((action: CarburantActions) => {
        return this.carburantService.getCarburantByIdEntreprise(action.payload)
          .pipe(
            map((deparments) =>
              new GetAllCarburantsActionSuccess(deparments)),
            catchError((err) => of(new GetAllCarburantsActionError(err)))
          );
      })
    )
  );
  /*  get All carburant by vehicule */

  getAllCarburantsByVehiculeEffect: Observable<CarburantActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(CarburantsActionsTypes.GET_ALL_CARUBURANTSBYVEHICULE),
      mergeMap((action: CarburantActions) => {
        return this.carburantService.getCarburantByVehiculeByEntreprise(action.payload)
          .pipe(
            map((deparments) =>
              new GetAllCarburantsByVehiculeActionSuccess(deparments)),
            catchError((err) => of(new GetAllCarburantsByVehiculeActionError(err)))
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
