import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entre-email',
  templateUrl: './entre-email.component.html',
  styleUrls: ['./entre-email.component.scss']
})
export class EntreEmailComponent implements OnInit {
  error: any;
  loading: any;
  emailForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
  let formValue = this.emailForm.value;
  console.log(formValue);
  this.router.navigate(['modifPassword']);
  }
}
