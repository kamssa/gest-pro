import { Component, OnInit } from '@angular/core';
import {AddBanqueComponent} from '../../banque/banque/add-banque/add-banque.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  isLinear: any;
  panelOpenState = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showNotification(bottom: string, right: string) {

  }

  addBanque() {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
