import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {NotificationService} from '../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Departement} from '../model/Departement';
import {Adresse} from '../model/Adresse';
import {EmployeService} from '../service/employe.service';
import {Employe} from '../model/Employe';

@Component({
  selector: 'app-modif-password',
  templateUrl: './modif-password.component.html',
  styleUrls: ['./modif-password.component.scss']
})
export class ModifPasswordComponent implements OnInit {
  loading: any;
  error: any;
  entreprise: any;
  personne: any;
  updateInformationForm: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private helper: JwtHelperService,
              private  employeService: EmployeService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const token = currentUser.body.body.accessToken;
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        console.log(this.personne);
        this.updateInformationForm = this.fb.group({
           id : this.personne   .id,
           version: this.personne.version,
           nom : this.personne.nom,
           prenom : this.personne.prenom,
           email : this.personne.email,
           telephone: this.personne.telephone,
           password : '',
           fonction : this.personne.fonction,
           nomComplet : this.personne.nomComplet,
           suspendu : this.personne.suspendu,
           actevated : this.personne.actevated,
           departement: this.personne.departement,
          type: this.personne.type,
          // roles: this.personne.roles,
    });
      });
    }

  }

  onSubmit() {
  let formValue = this.updateInformationForm.value;
  console.log(formValue);
  this.employeService.updateInfo(formValue)
    .subscribe(data => {
   console.log(data.body);
    });
  }
}
