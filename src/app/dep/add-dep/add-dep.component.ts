import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Departement} from '../../model/Departement';
import {DepService} from '../../service/dep.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Entreprise} from '../../model/Entreprise';
import {AuthService} from '../../service/auth.service';
import {Store} from '@ngrx/store';
import {SaveDepartementAction, UpdateDepartementAction} from '../ngrx-dep/dep.actions';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.scss']
})
export class AddDepComponent implements OnInit {

  departement: Departement;
  constructor( private store: Store<any>,
               private fb: FormBuilder,
               public departementService: DepService,
               private helper: JwtHelperService,
               private authService: AuthService,
               private notificationService: NotificationService,
               private dialogRef: MatDialogRef<AddDepComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Entreprise) {

  }




  ngOnInit(): void {

  }

  onSubmit(): void{
     if (!this.departementService.form.get('id').value){
      this.departement = {
        libelle: this.departementService.form.value.libelle,
        description: this.departementService.form.value.description,
        entreprise: this.data['entreprise']
      };
      console.log(this.departement);
      console.log(this.data['entreprise']);


       this.store.dispatch(new SaveDepartementAction(this.departement));
       this.notificationService.success('Département ajouté avec succès');
       this.onClose();
      }else {
       this.departement = {
         id:  this.departementService.form.value.id,
         version:  this.departementService.form.value.version,
         libelle: this.departementService.form.value.libelle,
         description: this.departementService.form.value.description,
         entreprise: this.data['entreprise']
       };
       this.store.dispatch(new UpdateDepartementAction(this.departement));
       this.notificationService.success('Département modifié avec succès');
       this.onClose();
     }

  }

  onClose() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }

}
