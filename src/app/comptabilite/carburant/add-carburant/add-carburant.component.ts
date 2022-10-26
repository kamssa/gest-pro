import {Component, Inject, OnInit} from '@angular/core';
import {Vehicule} from '../../../model/vehicule';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../../service/auth.service';
import {NotificationService} from '../../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Carburant} from '../../../model/carburant';
import {CarburantService} from '../../../service/carburant.service';
import {Router} from '@angular/router';
import {SaveCarburantsAction, UpdateCarburantsAction} from '../ngrx-carburant/carburant.actions';
import {StaionEssenceService} from '../../../service/staion-essence.service';
import {StationEssence} from '../../../model/stationEssence';
import {MatOption} from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-carburant',
  templateUrl: './add-carburant.component.html',
  styleUrls: ['./add-carburant.component.scss']
})
export class AddCarburantComponent implements OnInit {

  carburant: Carburant;
  vehicule: Vehicule;
  stationEssence: StationEssence[];
  myControl = new FormControl<string | StationEssence>('');
  filteredOptions: Observable<StationEssence[]>;
  stationEssenceSelected: StationEssence;

  constructor( private store: Store<any>,
               private fb: FormBuilder,
               private  router: Router,
               public carburantService: CarburantService,
               private helper: JwtHelperService,
               private authService: AuthService,
               private  staionEssenceService: StaionEssenceService,
               private notificationService: NotificationService,
               private dialogRef: MatDialogRef<AddCarburantComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Vehicule) {

  }




  ngOnInit(): void {
    console.log(this.data['vehicule']);
    this.vehicule = this.data['vehicule'];
    this.staionEssenceService.getStationEssenceByIdEntreprise(this.vehicule.entreprise.id)
      .subscribe(data => {
       this.stationEssence = data.body;
        if (this.stationEssence.length !== 0){
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => {
              const nom = typeof value === 'string' ? value : value?.nom;
              return nom ? this._filter(nom as string) : this.stationEssence.slice();
            }),
          );
        }
      });
  }
  displayFn(stationEssence: StationEssence): string {
    return stationEssence && stationEssence.nom ? stationEssence.nom : '';
  }

  private _filter(chauffeur: string): Vehicule[] {
    const filterValue = chauffeur.toLowerCase();

    return this.stationEssence.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  OnHumanSelected(option: MatOption) {
    this.stationEssenceSelected = option.value;
    console.log(this.stationEssenceSelected);
  }
  onSubmit(): void{
    if (!this.carburantService.form.get('id').value){
      this.carburant = {
        date: this.carburantService.form.value.date,
        nomChauffeur:  this.carburantService.form.value.nomChauffeur,
        prixUnitaire: this.carburantService.form.value.prixUnitaire,
        quantite: this.carburantService.form.value.quantite,
        vehicule: this.data['vehicule'],
        stationEssence: this.stationEssenceSelected,
        entreprise: this.vehicule.entreprise
      };
      console.log(this.carburant);
      this.store.dispatch(new SaveCarburantsAction(this.carburant));
      this.notificationService.success('Carburant ajouté avec succès');
      this.router.navigate(['vehicule/listCarburant']);
      this.onClose();
    }else {
      this.carburant = {
        id:  this.carburantService.form.value.id,
        version:  this.carburantService.form.value.version,
        date: this.carburantService.form.value.date,
        nomChauffeur:  this.carburantService.form.value.nomChauffeur,
        prixUnitaire: this.carburantService.form.value.prixUnitaire,
        quantite: this.carburantService.form.value.quantite,
        vehicule: this.data['vehicule'],
        entreprise: this.vehicule.entreprise
      };
      this.store.dispatch(new UpdateCarburantsAction(this.carburant));
      this.notificationService.success('Carburant modifié avec succès');
      this.router.navigate(['vehicule/listCarburant']);

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

  onCancel() {

  }
}
