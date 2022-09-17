import { Component, OnInit } from '@angular/core';
import {AddBanqueComponent} from '../banque/add-banque/add-banque.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChoixBanqueComponent} from '../choix-banque/choix-banque.component';

@Component({
  selector: 'app-banque-nav-bar',
  templateUrl: './banque-nav-bar.component.html',
  styleUrls: ['./banque-nav-bar.component.scss']
})
export class BanqueNavBarComponent implements OnInit {
  error: any;
  editer: any;

  constructor( private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }



  onSearch(value: any) {

  }

  addVirement() {
    const dialogRef = this.dialog.open(ChoixBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  addRetrait() {
    const dialogRef = this.dialog.open(ChoixBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  addVersement() {
    const dialogRef = this.dialog.open(ChoixBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
