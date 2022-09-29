import {Component, Inject, OnInit} from '@angular/core';
import {Banque} from '../../model/Banque';
import {FormBuilder} from '@angular/forms';
import {NotificationService} from '../../helper/notification.service';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StaionEssenceService} from '../../service/staion-essence.service';
import {StationEssence} from '../../model/stationEssence';
import {SaveStationEssenceAction, UpdateStationEssenceAction} from '../ngrx-station/stationEssence.actions';
import {Entreprise} from '../../model/Entreprise';

@Component({
  selector: 'app-add-staion-essence',
  templateUrl: './add-staion-essence.component.html',
  styleUrls: ['./add-staion-essence.component.scss']
})
export class AddStaionEssenceComponent implements OnInit {
  stationEssence: StationEssence;
  constructor(private  fb: FormBuilder,
              public staionEssenceService: StaionEssenceService,
              private notificationService: NotificationService,
              private store: Store<any>,
              @Inject(MAT_DIALOG_DATA) public data: Entreprise,
              public dialogRef: MatDialogRef<AddStaionEssenceComponent>) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.staionEssenceService.form.get('id').value){
      this.stationEssence = {
        nom: this.staionEssenceService.form.value.nom,
        entreprise: this.data['entreprise']
      };
       this.store.dispatch(new SaveStationEssenceAction(this.stationEssence));
       this.notificationService.success('Station Essence ajouté avec succès');
       this.onClose();
    }else {
      this.stationEssence = {
        id:  this.staionEssenceService.form.value.id,
        version:  this.staionEssenceService.form.value.version,
        nom: this.staionEssenceService.form.value.nom,
        entreprise: this.data['entreprise']
      };
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
}
