import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DepartementState, DepartementStateEnum} from '../ngrx-dep/dep.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departementsState$: Observable<DepartementState>|null = null;
  readonly departementStateEnum = DepartementStateEnum;
  displayedColumns: any;
  listData: null;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.departementsState$ = this.store.pipe(
      map((state) =>  state.departementState)
    );
  }

  applyFilter($event: KeyboardEvent) {

  }

  onCreate() {

  }
}
