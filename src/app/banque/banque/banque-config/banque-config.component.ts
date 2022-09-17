import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {BanqueState, BanqueStateEnum} from '../ngrx-banque/banque.reducer';

@Component({
  selector: 'app-banque-config',
  templateUrl: './banque-config.component.html',
  styleUrls: ['./banque-config.component.scss']
})
export class BanqueConfigComponent implements OnInit {
  banquesState$: Observable<BanqueState>|null = null;
  readonly banqueStateEnum = BanqueStateEnum;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.banquesState$ = this.store.pipe(
      map((state) =>  state.banqueState)
    );
  }

}
