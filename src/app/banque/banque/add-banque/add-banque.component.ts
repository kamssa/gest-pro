import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BanqueService} from '../../../service/banque.service';
import {Banque} from '../../../model/Banque';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {NotificationService} from '../../../helper/notification.service';
import {Entreprise} from '../../../model/Entreprise';
import {SaveBanqueByEntrepriseAction, UpdateBanqueByEntrepriseAction} from '../ngrx-banque/banque.actions';

@Component({
  selector: 'app-add-banque',
  templateUrl: './add-banque.component.html',
  styleUrls: ['./add-banque.component.scss']
})
export class AddBanqueComponent implements OnInit {
  banque: Banque;
  constructor(private  fb: FormBuilder,
              public banqueService: BanqueService,
              private notificationService: NotificationService,
              private store: Store<any>,
              @Inject(MAT_DIALOG_DATA) public data: Entreprise,
              public dialogRef: MatDialogRef<AddBanqueComponent>) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.banqueService.form.get('id').value){
      this.banque = {
        nom: this.banqueService.form.value.nom,
        entreprise: this.data['entreprise']

      };
      this.store.dispatch(new SaveBanqueByEntrepriseAction(this.banque));
      this.notificationService.success('Banque ajouté avec succès');
      this.onClose();
    }else {
      this.banque = {
        id:  this.banqueService.form.value.id,
        version:  this.banqueService.form.value.version,
        nom: this.banqueService.form.value.nom,
        entreprise: this.data['entreprise']

      };
      this.store.dispatch(new UpdateBanqueByEntrepriseAction(this.banque));
      this.notificationService.success('Banque modifié avec succès');
      this.onClose();
    }

  }

  onClose() {
    this.banqueService.form.reset();
    this.banqueService.initializeFormGroup();
    this.dialogRef.close();
  }

}
