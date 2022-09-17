import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {VehiculeState, VehiculeStateEnum} from '../ngrx-vehicule/vehicule.reducer';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {
  vehiculeState$: Observable<VehiculeState>|null = null;
  readonly vehiculeStateEnum = VehiculeStateEnum;
  displayedColumns: any;
  listData: null;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.vehiculeState$ = this.store.pipe(
      map((state) =>  {
        return   state.vehiculeSate;
      })
    );
  }

  applyFilter($event: KeyboardEvent) {

  }


}
