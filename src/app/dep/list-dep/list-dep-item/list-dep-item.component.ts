import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-dep-item',
  templateUrl: './list-dep-item.component.html',
  styleUrls: ['./list-dep-item.component.scss']
})
export class ListDepItemComponent implements OnInit {
  listData: any;
  displayedColumns: any;

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(row: any) {

  }

  onDelete(row: any) {

  }
}
