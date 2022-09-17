import {Component, Inject, OnInit} from '@angular/core';
import {Departement} from '../../model/Departement';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {DepService} from '../../service/dep.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../service/auth.service';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Entreprise} from '../../model/Entreprise';
import {SaveDepartementAction, UpdateDepartementAction} from '../../dep/ngrx-dep/dep.actions';
import {Vehicule} from '../../model/vehicule';
import {VehiculeService} from '../../service/vehicule.service';
import {SaveVehiculeAction, UpdateVehiculeAction} from '../ngrx-vehicule/vehicule.actions';

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.scss']
})
export class AddVehiculeComponent implements OnInit {

  vehicule: Vehicule;
  constructor( private store: Store<any>,
               private fb: FormBuilder,
               public vehiculeService: VehiculeService,
               private helper: JwtHelperService,
               private authService: AuthService,
               private notificationService: NotificationService,
               private dialogRef: MatDialogRef<AddVehiculeComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Entreprise) {

  }




  ngOnInit(): void {

  }

  onSubmit(): void{
    if (!this.vehiculeService.form.get('id').value){
      this.vehicule = {
        chauffeur: this.vehiculeService.form.value.chauffeur,
        matriculation: this.vehiculeService.form.value.matriculation,
        couleur: this.vehiculeService.form.value.couleur,
        marque: this.vehiculeService.form.value.marque,
        entreprise: this.data['entreprise']
      };
      this.store.dispatch(new SaveVehiculeAction(this.vehicule));
      this.notificationService.success('Véhicule ajouté avec succès');
      this.onClose();
    }else {
      this.vehicule = {
        id:  this.vehiculeService.form.value.id,
        version:  this.vehiculeService.form.value.version,
        chauffeur: this.vehiculeService.form.value.chauffeur,
        matriculation: this.vehiculeService.form.value.matriculation,
        couleur: this.vehiculeService.form.value.couleur,
        marque: this.vehiculeService.form.value.marque,
        entreprise: this.data['entreprise']
      };
      this.store.dispatch(new UpdateVehiculeAction(this.vehicule));
      this.notificationService.success('Véhicule modifié avec succès');
      this.onClose();
    }

  }

  onClose() {
    this.vehiculeService.form.reset();
    this.vehiculeService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.vehiculeService.form.reset();
    this.vehiculeService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }

}
