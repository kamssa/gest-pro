import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {StaionEssenceService} from '../../service/staion-essence.service';
import {
  DeleteStationEssenceActionError,
  DeleteStationEssenceActionSuccess,
  GetAllStationEssenceActionError,
  GetAllStationEssenceActionSuccess, SaveStationEssenceActionError, SaveStationEssenceActionSuccess,
  StationEssenceActions,
  StationEssenceActionsTypes, UpdateStationEssenceActionError, UpdateStationEssenceActionSuccess
} from './stationEssence.actions';



@Injectable()
export class StationEssenceEffects {
  id: number;
  personne: any;
  constructor(private staionEssenceService: StaionEssenceService,
              private effectActions: Actions) {

  }

  getAllStaionEssenceByEntrepriseEffect: Observable<StationEssenceActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(StationEssenceActionsTypes.GET_ALL_STATIONESSENCE),
      mergeMap((action: StationEssenceActions) => {
        return this.staionEssenceService.getStationEssenceByIdEntreprise(action.payload)
          .pipe(
            map((vehicules) =>
              new GetAllStationEssenceActionSuccess(vehicules)),
            catchError((err) => of(new GetAllStationEssenceActionError(err)))
          );
      })
    )
  );

    saveStationEssenceByEntrepriseEffect: Observable<StationEssenceActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(StationEssenceActionsTypes.SAVE_STATIONESSENCE),
      mergeMap((action: StationEssenceActions) => {
        return this.staionEssenceService.ajoutStationEssence(action.payload)
          .pipe(
            map((vehicule) =>
              new SaveStationEssenceActionSuccess(vehicule)),
            catchError((err) => of(new SaveStationEssenceActionError(err.message)))
          );
      })
    )
  );
  /*  update departeent*/
  updateStationEssenceByEntrepriseEffect: Observable<StationEssenceActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(StationEssenceActionsTypes.UPDATE_STATIONESSENCE),
      mergeMap((action: StationEssenceActions) => {
        return this.staionEssenceService.modifStationEssence(action.payload)
          .pipe(
            map((vehicule) =>
              new UpdateStationEssenceActionSuccess(vehicule)),
            catchError((err) => of(new UpdateStationEssenceActionError(err.message)))
          );
      })
    )
  );
  deleteStationEssenceByEntrepriseEffect: Observable<StationEssenceActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(StationEssenceActionsTypes.DELETE_STATIONESSENCE),
      mergeMap((action: StationEssenceActions) => {
        return this.staionEssenceService.supprimerStationEssence(action.payload.id)
          .pipe(
            map(() => new DeleteStationEssenceActionSuccess(action.payload)),
            catchError((err) => of(new DeleteStationEssenceActionError(err.message)))
          );
      })
    )
  );

}
