import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BanqueState, BanqueStateEnum} from '../../banque/banque/ngrx-banque/banque.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {StationEssenceState, StationEssenceStateEnum} from '../ngrx-station/stationEssence.reducer';

@Component({
  selector: 'app-staion-essence',
  templateUrl: './staion-essence.component.html',
  styleUrls: ['./staion-essence.component.scss']
})
export class StaionEssenceComponent implements OnInit {
  stationServiceState$: Observable<StationEssenceState>|null = null;
  readonly stationEssenceStateEnum = StationEssenceStateEnum;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.stationServiceState$ = this.store.pipe(
      map((state) =>  state.stationEssenceState)
    );
  }

}
