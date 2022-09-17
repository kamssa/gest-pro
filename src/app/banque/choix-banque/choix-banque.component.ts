import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatDialog} from '@angular/material/dialog';
import {BanqueService} from '../../service/banque.service';
import {NotificationService} from '../../helper/notification.service';
import {DepartementState} from '../../dep/ngrx-dep/dep.reducer';
import {BanqueState} from '../banque/ngrx-banque/banque.reducer';
import {CumulParDateComponent} from '../../finance/operationsTravaux/cumul-par-date/cumul-par-date.component';
import {AddRetraitComponent} from '../retrait/add-retrait/add-retrait.component';

@Component({
  selector: 'app-choix-banque',
  templateUrl: './choix-banque.component.html',
  styleUrls: ['./choix-banque.component.scss']
})
export class ChoixBanqueComponent implements OnInit {
  selectedValue: string;
  array: any;
  id: any;
  clients = [
    { id : 1, clientName: 'Bruce'},
    { id : 2, clientName: 'Ben'},
    { id : 3, clientName: 'Peter'}
  ];
  state: BanqueState;
  constructor(private store: Store,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private banqueService: BanqueService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.array = this.store.subscribe(item => {
      console.log(item);
    }
  );

}

  changeClient(value: any){
    this.id = this.selectedValue;
    console.log("selected --->", this.selectedValue);
  }

  onValider() {
    console.log(this.id);
    const dialogRef = this.dialog.open(AddRetraitComponent, {
      data: {
        id: this.id,
      }
    });
  }
}
