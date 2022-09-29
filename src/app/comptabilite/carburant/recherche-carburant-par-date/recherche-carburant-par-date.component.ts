import {Component, Inject, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {VehiculeService} from '../../../service/vehicule.service';
import {Vehicule} from '../../../model/vehicule';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Entreprise} from '../../../model/Entreprise';
import {map, startWith} from 'rxjs/operators';
import {MatOption} from '@angular/material/core';
import {CumulParDateComponent} from '../../../finance/operationsTravaux/cumul-par-date/cumul-par-date.component';
import {ListCarburantComponent} from '../list-carburant/list-carburant.component';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {CarburantParVehiculeComponent} from '../carburant-par-vehicule/carburant-par-vehicule.component';

@Component({
  selector: 'app-recherche-carburant-par-date',
  templateUrl: './recherche-carburant-par-date.component.html',
  styleUrls: ['./recherche-carburant-par-date.component.scss']
})
export class RechercheCarburantParDateComponent implements OnInit {
  entreprise: any;
  personne: any;
  vehicules: Vehicule[];
  vehicule: Vehicule;
  vehiculeSelected: Vehicule;

  myControl = new FormControl<string | Vehicule>('');
  filteredOptions: Observable<Vehicule[]>;
  roomsFilter: any;
  roomsFilter1: any;

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthService,
              private helper: JwtHelperService,
              private  vehiculeService: VehiculeService,
              public datepipe: DatePipe,
              public dialog: MatDialog,
              private router: Router,
              private dialogRef: MatDialogRef<RechercheCarburantParDateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Entreprise) {

  }

  ngOnInit() {

    this.entreprise =  this.data['entreprise'];
    this.vehiculeService.getVehiculeByIdEntreprise(this.entreprise.id)
    .subscribe(v => {
      this.vehicules = v.body;
      if (this.vehicules.length !== 0){
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const chauffeur = typeof value === 'string' ? value : value?.chauffeur;
            return chauffeur ? this._filter(chauffeur as string) : this.vehicules.slice(1, 10);
          }),
        );
      }

    });
  }
  displayFn(vehicule: Vehicule): string {
    return vehicule && vehicule.chauffeur ? vehicule.chauffeur : '';
  }

  private _filter(chauffeur: string): Vehicule[] {
    const filterValue = chauffeur.toLowerCase();

    return this.vehicules.filter(option => option.chauffeur.toLowerCase().includes(filterValue));
  }



  OnHumanSelected(option: MatOption) {
    this.vehiculeSelected = option.value;
  }
  dateChange($event: any) {
    this.roomsFilter = $event.target.value;
  }

  dateChange1($event: any) {
    this.roomsFilter1 = $event.target.value;
  }

  submit() {

    const dateDebut = this.datepipe.transform(this.roomsFilter, 'yyyy-MM-dd');
    const dateFin = this.datepipe.transform(this.roomsFilter1, 'yyyy-MM-dd');
    const vehiculeSelected = this.vehiculeSelected;
    this.dialogRef.close();
    this.dialog.open(CarburantParVehiculeComponent, {
      data: {
        vehicule: vehiculeSelected,
        dateDebut: dateDebut,
        dateFin: dateFin
      }
    });
  }
}
