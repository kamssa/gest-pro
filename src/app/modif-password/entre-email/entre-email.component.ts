import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {NotificationService} from '../../helper/notification.service';

@Component({
  selector: 'app-entre-email',
  templateUrl: './entre-email.component.html',
  styleUrls: ['./entre-email.component.scss']
})
export class EntreEmailComponent implements OnInit {
  error: any;
  loading: any;
  emailForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
              private autresService: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    let formValue = this.emailForm.value.email;
  console.log(formValue);
  this.autresService.getPersonneByEmail(formValue)
    .subscribe(res => {
      console.log(res);
      if (res.status === 0){
        this.router.navigate(['modifPassword', { personne: JSON.stringify(res.body)}]);
      }else {
        this.notificationService.warn('Aucun email correspondant se trouve dans la base');
      }

    });

  }
}
