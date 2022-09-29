import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {VehiculeState, VehiculeStateEnum} from '../../vehicule/ngrx-vehicule/vehicule.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.scss']
})
export class CarburantComponent implements OnInit {
  carburantState$: Observable<VehiculeState>|null = null;
  readonly  carburantStateEnum = VehiculeStateEnum;
  displayedColumns: any;
  listData: null;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.carburantState$ = this.store.pipe(
      map((state) =>  {
        return   state.carburantState;
      })
    );
  }

  applyFilter($event: KeyboardEvent) {

  }


}
