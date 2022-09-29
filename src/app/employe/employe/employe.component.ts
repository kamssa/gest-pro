import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {VehiculeState} from '../../vehicule/ngrx-vehicule/vehicule.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {EmployeStateEnum} from '../ngrx-employe/employe.reducer';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  employeState$: Observable<VehiculeState>|null = null;
  readonly employeStateEnum = EmployeStateEnum;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.employeState$ = this.store.pipe(
      map((state) =>  {
        return   state.employesState;
      })
    );
  }

  applyFilter($event: KeyboardEvent) {

  }


}
