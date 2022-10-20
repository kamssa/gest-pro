import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../../model/Client';
import { FormBuilder, FormGroup} from '@angular/forms';
import {ClientService} from '../../service/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
client: Client;
clientForm: FormGroup;
  constructor( private  clientService: ClientService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Client,
               public dialogRef: MatDialogRef<UpdateClientComponent>) { }

  ngOnInit(): void {
    this.clientService.getClientById(this.data['client'])
        .subscribe(result => {
          console.log('Voir la modif', result.body);
          this.client = result.body;
          this.clientForm = this.fb.group({
            id: this.client.id,
            version: this.client.version,
            libelle: this.client.libelle,
            nom: this.client.nom,
            prenom: this.client.prenom,
            email: this.client.email,
            telephone: this.client.telephone,
            password :  this.client.password,
            actived: this.client.actived,
            adresse: this.client.adresse,
            type: this.client.type
          });
        });
    }

  onSubmit() {
 console.log(this.clientForm.value);
 this.clientService.modifClient(this.clientForm.value)
   .subscribe(data => {

    console.log('Succes', this.data);
   });
 this.onClose();
  }
  onClose() {
    this.dialogRef.close();
  }
}
