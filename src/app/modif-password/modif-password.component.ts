import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-modif-password',
  templateUrl: './modif-password.component.html',
  styleUrls: ['./modif-password.component.scss']
})
export class ModifPasswordComponent implements OnInit {
  loading: any;
  error: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

}
