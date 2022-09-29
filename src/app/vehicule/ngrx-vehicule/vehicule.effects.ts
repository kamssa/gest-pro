import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  DeleteVehiculeActionError,
  DeleteVehiculeActionSuccess,
  GetAllVehiculeByEntrepriseActionError,
  GetAllVehiculeByEntrepriseActionSuccess,
  NewVehiculeActionSuccess, SaveVehiculeActionError,
  SaveVehiculeActionSuccess,
  UpdateVehiculeActionError,
  UpdateVehiculeActionSuccess,
  VehiculeActions,
  VehiculesActionsTypes
} from './vehicule.actions';
import {VehiculeService} from '../../service/vehicule.service';


@Injectable()
export class VehiculeEffects {
  id: number;
  personne: any;
  constructor(private vehiculeService: VehiculeService,
              private effectActions: Actions) {

  }

  getAllVehiculesByEntrepriseEffect: Observable<VehiculeActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(VehiculesActionsTypes.GET_ALL_VEHICULESBYENTREPRISE),
      mergeMap((action: VehiculeActions) => {
        return this.vehiculeService.getVehiculeByIdEntreprise(action.payload)
          .pipe(
            map((vehicules) =>
              new GetAllVehiculeByEntrepriseActionSuccess(vehicules)),
            catchError((err) => of(new GetAllVehiculeByEntrepriseActionError(err)))
          );
      })
    )
  );
  NewVehiculesEffect: Observable<VehiculeActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(VehiculesActionsTypes.NEW_VEHICULES),
      map((action: VehiculeActions) => {
        return new NewVehiculeActionSuccess({});

      })
    )
  );
    saveVehiculeByEntrepriseEffect: Observable<VehiculeActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(VehiculesActionsTypes.SAVE_VEHICULES),
      mergeMap((action: VehiculeActions) => {
        return this.vehiculeService.ajoutVehicule(action.payload)
          .pipe(
            map((vehicule) =>
              new SaveVehiculeActionSuccess(vehicule)),
            catchError((err) => of(new SaveVehiculeActionError(err.message)))
          );
      })
    )
  );
  /*  update departeent*/
  updateVehiculeByEntrepriseEffect: Observable<VehiculeActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(VehiculesActionsTypes.UPDATE_VEHICULES),
      mergeMap((action: VehiculeActions) => {
        return this.vehiculeService.modifVehicule(action.payload)
          .pipe(
            map((vehicule) =>
              new UpdateVehiculeActionSuccess(vehicule)),
            catchError((err) => of(new UpdateVehiculeActionError(err.message)))
          );
      })
    )
  );
  deleteVehiculeByEntrepriseEffect: Observable<VehiculeActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(VehiculesActionsTypes.DELETE_VEHICULES),
      mergeMap((action: VehiculeActions) => {
        return this.vehiculeService.supprimerVehicule(action.payload.id)
          .pipe(
            map(() => new DeleteVehiculeActionSuccess(action.payload)),
            catchError((err) => of(new DeleteVehiculeActionError(err.message)))
          );
      })
    )
  );

}
