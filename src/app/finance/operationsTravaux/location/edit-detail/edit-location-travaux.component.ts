import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {LocationService} from "../../../../service/location.service";
import {LocationTravaux} from "../../../../model/LocationTravaux";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NotificationService} from '../../../../helper/notification.service';

@Component({
  selector: 'app-edit-location-travaux',
  templateUrl: './edit-location-travaux.component.html',
  styleUrls: ['./edit-location-travaux.component.scss']
})
export class EditLocationTravauxComponent implements OnInit {
  locationForm: FormGroup;
  editMode = false;
  locationTravaux: LocationTravaux;
  detailLocationTravauxInit: any;
  @Input() projetId: number;
  constructor(private  fb: FormBuilder,
              private  router: Router,
              private notificationService: NotificationService,
              private locationService: LocationService,
              @Inject(MAT_DIALOG_DATA) public data: LocationTravaux) { }

  ngOnInit(): void {
    if (this.data['locationTravaux']){
      this.editMode = true;
      this.locationService.getLocationById(this.data['locationTravaux'])
        .subscribe(result => {
          console.log('Voir la modif', result.body);
          this.locationTravaux = result.body;
          this.detailLocationTravauxInit = new FormArray([]);
          if (this.locationTravaux.detailLocation.length !== 0) {
            for (const detailLocation of this.locationTravaux.detailLocation) {
              this.detailLocationTravauxInit.push(
                this.fb.group({
                  id: detailLocation.id,
                  version: detailLocation.version,
                  montant: detailLocation.montant,
                  date: detailLocation.date,
                  materiaux: this.fb.group({
                    id: detailLocation.materiaux.id,
                    version: detailLocation.materiaux.version,
                    libelle: detailLocation.materiaux.libelle
                  }),
                  fournisseur: this.fb.group({
                    id: detailLocation.fournisseur.id,
                    version: detailLocation.fournisseur.version,
                    libelle: detailLocation.fournisseur.libelle
                  }),
                })
              );
            }
          }
          this.locationForm = this.fb.group({
            id: this.locationTravaux.id,
            version: this.locationTravaux.version,
            projetId: this.locationTravaux.projetId,
            detailLocation: this.detailLocationTravauxInit,
          });
        });
    } else {
      this.initForm();
    }

  }

  initForm(){
    this.locationForm =  this.fb.group({
      montant: '',
      projetId: '',
      detailLocation : this.fb.array([this.initItemRows()])
    });
  }
  initItemRows(){
    return this.fb.group({
      id: [''],
      version: [''],
      montant: ['', Validators.required],
      date: ['', Validators.required],
      materiaux: this.fb.group({
        id: [''],
        version: [''],
        libelle: ['', Validators.required],
      }),
      fournisseur: this.fb.group({
        id: [''],
        version: [''],
        libelle: ['']
      }),
    });
  }
  get formArr(){
    return this.locationForm.get('detailLocation') as FormArray;
  }
  onSubmit(){
    const  formValue = this.locationForm.value;
    console.log(formValue);
    let locationTravaux = new LocationTravaux(null,
      null,
      'location',
      new Date(),
      this.projetId,
      formValue['detailLocation']);
      this.locationService.ajoutLocationTravaux(locationTravaux).subscribe(data => {
      console.log('location enregistrer', data.body);
      //this.montant = data.body.montant;
        this.notificationService.warn('Enregistrement effectué avec succès');


    }, error => {
      //this.errorHandler.handleError(error);
      //  this.errorMessage = this.errorHandler.errorMessage;
      console.log('desole');
    });

    console.log('voir les achats', locationTravaux);
    this.locationForm.reset();

  }
  addNewRows(){
    this.formArr.push(this.initItemRows());
  }
  deleteRow(index: number){
    this.formArr.removeAt(index);
  }
}
