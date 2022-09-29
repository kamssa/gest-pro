import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mission-nav-bar',
  templateUrl: './mission-nav-bar.component.html',
  styleUrls: ['./mission-nav-bar.component.scss']
})
export class MissionNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(value: any) {

  }

  addMission() {

  }

  openListMission() {
    this.router.navigate(['mission/listMission']);
  }
}
