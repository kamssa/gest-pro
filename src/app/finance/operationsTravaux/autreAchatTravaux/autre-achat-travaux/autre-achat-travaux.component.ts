import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {Employe} from '../../../../model/Employe';
import {Observable} from 'rxjs';
import {Materiaux} from '../../../../model/Materiaux';
import {DetailAticleStockGeneralService} from '../../../../service/detail-aticle-stock-general.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DialogConfirmService} from '../../../../helper/dialog-confirm.service';
import {NotificationService} from '../../../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../../../service/employe.service';
import {map, startWith, switchMap} from 'rxjs/operators';
import {AutreAchatTravauxService} from '../../../../service/autre-achat-travaux.service';
import {AutreAchatTravaux} from '../../../../model/AutreAchatTravaux';
import {CategorieService} from '../../../../service/categorie.service';
import {Projet} from '../../../../model/projet';
import {ProjetService} from '../../../../service/projet.service';
import {AuthService} from '../../../../service/auth.service';
import {AddDepComponent} from '../../../../dep/add-dep/add-dep.component';
import {EditDetailAutreAchatComponent} from '../edit-detail-autre-achat/edit-detail-autre-achat.component';

@Component({
  selector: 'app-autre-achat-travaux',
  templateUrl: './autre-achat-travaux.component.html',
  styleUrls: ['./autre-achat-travaux.component.scss']
})
export class AutreAchatTravauxComponent implements OnInit {
  autreAchatTravauxForm: FormGroup;
  editMode = false;
  autreAchatTravaux: AutreAchatTravaux;
  autreAchat: AutreAchatTravaux;
  detailAutreAchatTravauxInit: any;
  montant: number;

  now = Date.now();
  personne: any;
  array: any;
  roles: any;
  employe: Employe;
  res: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  public errorMessage: string = '';
  @ViewChild('dat', {static: false}) dateInput: ElementRef;
  @ViewChild('libelleMateriaux', {static: false}) libelleMateriauxInput: ElementRef;
  @ViewChild('value', {static: false}) valueInput: ElementRef;
  @ViewChild('quantite', {static: false}) quantiteInput: ElementRef;
  @ViewChild('frais', {static: false}) fraisInput: ElementRef;
  @ViewChild('montant', {static: false}) montantInput: ElementRef;
  @ViewChild('fournisseur', {static: false}) fournisseurInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;
  materiaux: Materiaux [];
  materiau: Materiaux;
  myControl = new FormControl();
  projet: Projet;
  projetId: number;
  startDate: Date;
  addRow = false;
///////////////////////////
  @Output() result = new EventEmitter<{ key: string, data1: Array<string> }>();
​
  @Input() placeholder = 'Selectionner des éléments';
  @Input() data1: Array<string> = [];
  @Input() key = '';
​
  selectControl = new FormControl();
​
  rawData: Array<Materiaux> = [];
  selectData: Array<Materiaux> = [];
​
  filteredData: Observable<Array<Materiaux>>;
  filterString = '';
  lib: Array<string>;
//////////////////////////

  constructor(private  fb: FormBuilder,
              private categorieService: CategorieService,
              private  autreAchatTravauxService: AutreAchatTravauxService,
              private detailAticleStockGeneralService: DetailAticleStockGeneralService,
              public dialog: MatDialog,
              private router: Router,
              private authService: AuthService,
              private projetService: ProjetService,
              private route: ActivatedRoute,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux,
              private employeService: EmployeService,
  ) {


  }

  ngOnInit(): void {

    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.authService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        this.roles = resultat.body.roles;
        this.roles.forEach(val => {
          console.log(val.name);
          this.ROLE_NAME = val.name;
          if (this.ROLE_NAME === 'ROLE_MANAGER') {
            this.ROLE_MANAGER = this.ROLE_NAME;
          }
        });
        this.personne = resultat.body;

        if (this.personne.type === 'EMPLOYE') {
          this.employeService.getEmployeById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            this.nav = true;
            this.route.paramMap.pipe(
              switchMap((params: ParamMap) =>
                this.projetService.getProjetById(+params.get('id')))
            ).subscribe(result => {
              this.projet = result.body;
              this.projetId = result.body.id;
              console.log(this.projetId);
            });
            this.categorieService.getMatByIdEntreprise(this.personne.departement.entreprise.id).subscribe(data => {
              console.log('materiel par entreprise: ', data.body);
              this.materiaux = data.body;
              this.data1.forEach((mat) => {
                //this.materiaux.push({ libelle, selected: false });
              });
              this.filteredData = this.selectControl.valueChanges.pipe(
                startWith<string>(''),
                map(value => typeof value === 'string' ? value : this.filterString),
                map(filter => this.filter(filter))
              );
            });
            if (this.data['autreAchatTravaux']) {
              this.editMode = true;
              this.autreAchatTravauxService.getAutreAchatTravauxById(this.data['autreAchatTravaux'])
                .subscribe(result => {

                  this.autreAchatTravaux = result.body;
                  this.detailAutreAchatTravauxInit = new FormArray([]);
                  if (this.autreAchatTravaux.detailAutreAchatTravaux.length !== 0) {
                    for (const detailAutreAchatTravaux of this.autreAchatTravaux.detailAutreAchatTravaux) {
                      this.detailAutreAchatTravauxInit.push(
                        this.fb.group({
                          id: detailAutreAchatTravaux.id,
                          version: detailAutreAchatTravaux.version,
                          libelleMateriaux: detailAutreAchatTravaux.libelleMateriaux,
                          prixUnitaire: detailAutreAchatTravaux.prixUnitaire,
                          quantite: detailAutreAchatTravaux.quantite,
                          frais: detailAutreAchatTravaux.frais,
                          fournisseur: detailAutreAchatTravaux.fournisseur,
                          montant: detailAutreAchatTravaux.montant,
                          date: detailAutreAchatTravaux.date,
                          projetId: detailAutreAchatTravaux.projetId
                        })
                      );
                    }
                  }
                  this.autreAchatTravauxForm = this.fb.group({
                    id: this.autreAchatTravaux.id,
                    version: this.autreAchatTravaux.version,
                    libelle: this.autreAchatTravaux.libelle,
                    date: this.autreAchatTravaux.date,
                    montant: this.autreAchatTravaux.montant,
                    projetId: this.autreAchatTravaux.projetId,
                    autreDetailAchatTravaux: this.detailAutreAchatTravauxInit,
                  });
                });
            } else {
              this.initForm();
            }

          });
        } else if (this.personne.type === 'EMPLOYE') {
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;

            });

        }

      });

    }
  }

  getCalcul() {
    return this.montantInput.nativeElement.value = this.valueInput.nativeElement.value * this.quantiteInput.nativeElement.value +
      parseInt(this.fraisInput.nativeElement.value);
  }


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelleMateriaux: [''],
      date: [''],
      unite: [''],
      prixUnitaire: [''],
      frais: [''],
      fournisseur: [''],
      quantite: [''],
      montant: [''],
      projetId: ['']
    });
  }

  initForm() {
    this.autreAchatTravauxForm = this.fb.group({
      id: '',
      version: '',
      numeroFacture: '',
      libelle: '',
      montant: '',
      fournisseur: '',
      date: '',
      projetId: '',
      detailAutreAchatTravaux: this.fb.array([this.initItemRows()])
    });

  }

  get formArr() {
    return this.autreAchatTravauxForm.get('detailAutreAchatTravaux') as FormArray;
  }

  searchFor() {
    console.log(this.startDate.toString());
  }

  onSubmit() {
  const libelle = this.lib.toString();
  console.log(libelle);
    if (!this.editMode) {
      this.materiau = JSON.parse(localStorage.getItem('materiau'));
      let formValue = this.autreAchatTravauxForm.value;

      let autreAchatTravaux = new AutreAchatTravaux(
        null,
        null,
        this.autreAchatTravauxForm.value.numeroFacture,
        libelle,
        this.autreAchatTravauxForm.value.montant,
        this.autreAchatTravauxForm.value.fournisseur,
        this.autreAchatTravauxForm.value.date,
        this.projetId,
        formValue['detailAutreAchatTravaux']
      );

      console.log('Voir Autre stock retourne', autreAchatTravaux);
      this.autreAchatTravauxService.ajoutAutreAchatTravaux(autreAchatTravaux)
        .subscribe(data => {
          if (data.status === 0){
            localStorage.removeItem('materiau');
            this.autreAchatTravaux = data.body;
            this.notificationService.warn('Enregistrement effectué avec succès');
          }
        });
      this.selectControl.reset;
      this.autreAchatTravauxForm.reset();

    }
    localStorage.removeItem('materiau');
  }

  deleteRow(i: any) {
    this.addRow = false;
    this.detailAutreAchatTravauxInit.removeAt(i);

  }

  addNewRows() {
    // this.addRow = true;
    this.formArr.push(this.initItemRows());


  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.autreAchatTravauxForm.value));
  }

  filter = (filter: string): Materiaux[] => {
    this.filterString = filter;
    if (filter.length > 0) {
      return this.materiaux.filter(option => {
        return option.libelle.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.materiaux.slice();
    }
  };
​
  displayFn = (): string => '';
  optionClicked = (event: Event, data: Materiaux): void => {
    event.stopPropagation();
    this.toggleSelection(data);
  };
  toggleSelection = (data: Materiaux): void => {
    data.selected = !data.selected;
​
  if (data.selected === true) {
    this.selectData.push(data);
    console.log(this.selectData);

  } else {
    const i = this.selectData.findIndex(value => value.libelle === data.libelle);
    this.selectData.splice(i, 1);
  }
​
  this.selectControl.setValue(this.selectData);
    this.emitAdjustedData();
  };
  emitAdjustedData = (): void => {
    const results: Array<string> = [];
    this.selectData.forEach((data1: Materiaux) => {
      results.push(data1.libelle);
      console.log(results);
      this.lib = results;
    });
    this.result.emit({key: this.key, data1: results});
  };
  removeChip = (data: Materiaux): void => {
    this.toggleSelection(data);
  };

  onSearch(value) {

    this.autreAchatTravauxService.rechercheAutreAchatParMc(value.keyword, this.projetId)
      .subscribe(res => {
        this.autreAchat = res;
        this.autreAchatTravauxForm = this.fb.group({
          id: res.id,
          version: res.version,
          numeroFacture: res.numeroFacture,
          libelle: res.libelle,
          montant: res.montant,
          fournisseur: res.fournisseur,
          date: res.date,
          projetId: res.projetId,
          detailAutreAchatTravaux: this.fb.array([this.initItemRows()])
        });
        this.addRow = !this.addRow;
      });
  }

  addDetail() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EditDetailAutreAchatComponent, {
      data: {
        autreAchatTravaux: this.autreAchat.id
      }

    });
  }
}
