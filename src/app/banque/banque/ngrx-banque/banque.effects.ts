import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';

import {catchError, map, mergeMap} from 'rxjs/operators';
import {BanqueService} from '../../../service/banque.service';
import {
  BanqueActions,
  BanqueActionsTypes,
  GetAllBanqueActionSuccess,
  GetAllBanqueError,
  SaveBanqueActionError,
  SaveBanqueActionSuccess
} from './banque.actions';


@Injectable()
export class BanqueEffects {
  id: number;
  personne: any;
  constructor(private banqueService: BanqueService,
              private effectActions: Actions) {

  }

  getAllanqueEffect: Observable<BanqueActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(BanqueActionsTypes.GET_ALL_BANQUE),
      mergeMap((action: BanqueActions) => {
        return this.banqueService.getAllBanque()
          .pipe(
            map((banques) =>
              new GetAllBanqueActionSuccess(banques)),
            catchError((err) => of(new GetAllBanqueError(err.message)))
          );
      })
    )
  );

    saveBanqueEffect: Observable<BanqueActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(BanqueActionsTypes.SAVE_BANQUE),
      mergeMap((action: BanqueActions) => {
        return this.banqueService.ajoutBanque(action.payload)
          .pipe(
            map((banque) =>
              new SaveBanqueActionSuccess(banque)),
            catchError((err) => of(new SaveBanqueActionError(err)))
          );
      })
    )
  );
  /* /!*  update departeent*!/
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
 */
}
