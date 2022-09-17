import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BanqueService} from '../../../service/banque.service';
import {Operation} from '../../../model/OperationBanque';
import {Banque} from '../../../model/Banque';
import {MatDialogRef} from '@angular/material/dialog';
import {SaveDepartementAction, UpdateDepartementAction} from '../../../dep/ngrx-dep/dep.actions';
import {Store} from '@ngrx/store';
import {NotificationService} from '../../../helper/notification.service';
import {SaveBanqueAction, UpdateBanqueAction} from '../ngrx-banque/banque.actions';

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
              public dialogRef: MatDialogRef<AddBanqueComponent>) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.banqueService.form.get('id').value){
      this.banque = {
        nom: this.banqueService.form.value.nom,
      };
      this.store.dispatch(new SaveBanqueAction(this.banque));
      this.notificationService.success('Banque ajouté avec succès');
      this.onClose();
    }else {
      this.banque = {
        id:  this.banqueService.form.value.id,
        version:  this.banqueService.form.value.version,
        nom: this.banqueService.form.value.nom,
      };
      this.store.dispatch(new UpdateBanqueAction(this.banque));
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
