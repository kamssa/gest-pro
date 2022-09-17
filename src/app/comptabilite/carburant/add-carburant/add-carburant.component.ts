import {Component, Inject, OnInit} from '@angular/core';
import {Vehicule} from '../../../model/vehicule';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {VehiculeService} from '../../../service/vehicule.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../../service/auth.service';
import {NotificationService} from '../../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Entreprise} from '../../../model/Entreprise';
import {SaveVehiculeAction, UpdateVehiculeAction} from '../../../vehicule/ngrx-vehicule/vehicule.actions';
import {Carburant} from '../../../model/carburant';
import {CarburantService} from '../../../service/carburant.service';

@Component({
  selector: 'app-add-carburant',
  templateUrl: './add-carburant.component.html',
  styleUrls: ['./add-carburant.component.scss']
})
export class AddCarburantComponent implements OnInit {

  carburant: Carburant;
  constructor( private store: Store<any>,
               private fb: FormBuilder,
               public carburantService: CarburantService,
               private helper: JwtHelperService,
               private authService: AuthService,
               private notificationService: NotificationService,
               private dialogRef: MatDialogRef<AddCarburantComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Vehicule) {

  }




  ngOnInit(): void {

  }

  onSubmit(): void{
    if (!this.carburantService.form.get('id').value){
      this.carburant = {
        date: this.carburantService.form.value.date,
        prixUnitaire: this.carburantService.form.value.matriculation,
        quantite: this.carburantService.form.value.marque,
        vehicule: this.data['vehicule']
      };
      this.store.dispatch(new SaveVehiculeAction(this.carburant));
      this.notificationService.success('Véhicule ajouté avec succès');
      this.onClose();
    }else {
      this.carburant = {
        id:  this.carburantService.form.value.id,
        version:  this.carburantService.form.value.version,
        date: this.carburantService.form.value.date,
        prixUnitaire: this.carburantService.form.value.matriculation,
        quantite: this.carburantService.form.value.marque,
        vehicule: this.data['vehicule']
      };
      this.store.dispatch(new UpdateVehiculeAction(this.carburant));
      this.notificationService.success('Véhicule modifié avec succès');
      this.onClose();
    }

  }

  onClose() {
    this.carburantService.form.reset();
    this.carburantService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.carburantService.form.reset();
    this.carburantService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }

}
