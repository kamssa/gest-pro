import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NotificationService} from '../../helper/notification.service';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StaionEssenceService} from '../../service/staion-essence.service';
import {StationEssence} from '../../model/stationEssence';
import {SaveStationEssenceAction, UpdateStationEssenceAction} from '../ngrx-station/stationEssence.actions';
import {Entreprise} from '../../model/Entreprise';
import {PrestationService} from '../../service/prestationService';
import {PrestationStation} from '../../model/PrestationStation';

@Component({
  selector: 'app-add-staion-essence',
  templateUrl: './add-staion-essence.component.html',
  styleUrls: ['./add-staion-essence.component.scss']
})
export class AddStaionEssenceComponent implements OnInit {
  stationEssence: StationEssence;
  prestationStations: PrestationStation[];
  prestationStation: PrestationStation;
  constructor(private  fb: FormBuilder,
              public staionEssenceService: StaionEssenceService,
              private notificationService: NotificationService,
              private store: Store<any>,
              private prestationService: PrestationService,
              @Inject(MAT_DIALOG_DATA) public data: Entreprise,
              public dialogRef: MatDialogRef<AddStaionEssenceComponent>) { }

  ngOnInit(): void {
    this.prestationService.getAllPrestationStation().subscribe(res => {
      this.prestationStations = res.body;
    }, error => {
    });

  }
  onSubmit() {
    if (!this.staionEssenceService.form.get('id').value){
      this.stationEssence = {
        nom: this.staionEssenceService.form.value.nom,
        vidange: this.staionEssenceService.form.value.vidange,
        prixSuper: this.staionEssenceService.form.value.prixSuper,
        prixGazoil: this.staionEssenceService.form.value.prixGazoil,
        prixHuileMoteur: this.staionEssenceService.form.value.prixHuileMoteur,
        prestationStation: this.prestationStation,
        entreprise: this.data['entreprise']
      };
      console.log(this.stationEssence);
       this.store.dispatch(new SaveStationEssenceAction(this.stationEssence));
       this.notificationService.success('Station Essence ajouté avec succès');
       this.onClose();
    }else {
      this.stationEssence = {
        id:  this.staionEssenceService.form.value.id,
        version:  this.staionEssenceService.form.value.version,
        nom: this.staionEssenceService.form.value.nom,
        vidange: this.staionEssenceService.form.value.vidange,
        prixSuper: this.staionEssenceService.form.value.prixSuper,
        prixGazoil: this.staionEssenceService.form.value.prixGazoil,
        prixHuileMoteur: this.staionEssenceService.form.value.prixHuileMoteur,
        prestationStation: this.prestationStation,
        entreprise: this.data['entreprise']
      };
      console.log(this.stationEssence);
      this.store.dispatch(new UpdateStationEssenceAction(this.stationEssence));
      this.notificationService.success('Station Essence modifié avec succès');
      this.onClose();
    }

  }

  onClose() {
    this.staionEssenceService.form.reset();
    this.staionEssenceService.initializeFormGroup();
    this.dialogRef.close();
  }
  greetDep(event) {

    console.log('Voir le select', event.value);
    this.prestationService.getPrestationStationById(event.value).subscribe(data => {
      this.prestationStation = data.body;
      console.log('valeur de retour de ville', this.prestationStation);
    });

  }
}
