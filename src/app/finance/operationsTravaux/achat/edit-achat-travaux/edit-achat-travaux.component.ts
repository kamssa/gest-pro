import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Inject
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Materiaux} from '../../../../model/Materiaux';
import {Employe} from '../../../../model/Employe';
import {DialogConfirmService} from '../../../../helper/dialog-confirm.service';
import {NotificationService} from '../../../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../../../service/employe.service';
import {map, startWith, switchMap} from 'rxjs/operators';
import {DetailAticleStockGeneralService} from '../../../../service/detail-aticle-stock-general.service';
import {DetailAticleStockGeneral} from '../../../../model/DetailAticleStockGeneral';
import {DetailAchatTravaux} from '../../../../model/DtailAchat';
import {Projet} from '../../../../model/projet';
import {ProjetService} from '../../../../service/projet.service';
import {AuthService} from '../../../../service/auth.service';


@Component({
  selector: 'app-edit-achat-travaux',
  templateUrl: './edit-achat-travaux.component.html',
  styleUrls: ['./edit-achat-travaux.component.scss']
})
export class EditAchatTravauxComponent implements OnInit {
  achatTravauxForm: FormGroup;
  editMode = false;
  achatTravaux: AchatTravaux;
  detailAchatTravaux: DetailAchatTravaux;
  detailAchatTravauxInit: any;
  montant: number;
  detailAticleStockGeneral: DetailAticleStockGeneral[];
  detailAticleStockGenerale: DetailAticleStockGeneral;
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
  @ViewChild("dat", {static: false}) dateInput: ElementRef;
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @ViewChild("fournisseur", {static: false}) fournisseurInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;
  projet: Projet;
  projetId: number;
  myControl = new FormControl();
  constructor(private  fb: FormBuilder,
              private  achatTravauxService: AchatTravauxService,
              private authService: AuthService,
              private detailAticleStockGeneralService: DetailAticleStockGeneralService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService, private projetService: ProjetService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux,
              private employeService: EmployeService, private route: ActivatedRoute,
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
            this.detailAticleStockGeneralService.getDetailAticleStockGeneralByIdEntreprise(this.personne.departement.entreprise.id)
              .subscribe(data => {
                console.log('Voir les données retournées', data.body);
                this.detailAticleStockGeneral = data.body;
                this.filteredOptions = this.myControl.valueChanges.pipe(

                  startWith(''),
                  map(value => (typeof value === 'string' ? value : value.libelleMateriaux)),
                  map(libelle => (libelle ? this.filter(libelle) : this.detailAticleStockGeneral.slice())),
                );
              });
            if (this.data['achatTravaux']){
              this.editMode = true;
              this.achatTravauxService.getAchatTravauxById(this.data['achatTravaux'])
                .subscribe(result => {

                  this.achatTravaux = result.body;
                  this.detailAchatTravauxInit = new FormArray([]);
                  if (this.achatTravaux.detailAchatTravaux.length !== 0) {
                    for (const detailAchatTravaux of this.achatTravaux.detailAchatTravaux) {
                      this.detailAchatTravauxInit.push(
                        this.fb.group({
                          id: detailAchatTravaux.id,
                          version: detailAchatTravaux.version,
                          libelleMateriaux: detailAchatTravaux.libelleMateriaux,
                          prixUnitaire: detailAchatTravaux.prixUnitaire,
                          quantite: detailAchatTravaux.quantite,
                          montant: detailAchatTravaux.montant,
                          projetId: detailAchatTravaux.projetId,
                          date: detailAchatTravaux.date
                        })
                      );
                    }
                  }
                  this.achatTravauxForm = this.fb.group({
                    id: this.achatTravaux.id,
                    version: this.achatTravaux.version ,
                    libelle: this.achatTravaux.libelle ,
                    date: this.achatTravaux.date,
                    montant: this.achatTravaux.montant,
                    projetId: this.achatTravaux.projetId,
                    detailAchatTravaux: this.detailAchatTravauxInit,
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
  private filter(libelleMateriaux: string): Materiaux[] {
    const filterValue = libelleMateriaux.toLowerCase();

    return this.detailAticleStockGeneral.filter(option => option.libelleMateriaux.toLowerCase().includes(filterValue));
  }
  displayFn(mat: DetailAticleStockGeneral): string {
    if (mat) {
      this.selected = mat && mat.libelleMateriaux ? mat.libelleMateriaux : '';
      this.detailAticleStockGenerale = mat;
      localStorage.setItem('materiau', JSON.stringify(mat));
      console.log(this.detailAticleStockGenerale);
      return mat && mat.libelleMateriaux;
    }else {

    }

  }
  getCalcul() {
    return  this.montantInput.nativeElement.value = this.valueInput.nativeElement.value * this.quantiteInput.nativeElement.value;

  }


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelleMateriaux: [''],
      unite: [''],
      prixUnitaire: [''],
      quantite: ['', Validators.required],
      montant: [''],
      projetId: [''],
      date: [''],
    });
  }
  initForm() {
    this.achatTravauxForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      date: '',
      montant: '',
      projetId: '',
      detailAchatTravaux: this.fb.array([this.initItemRows()])
    });

  }
  public myError = (controlName: string, errorName: string) => {
    return this.achatTravauxForm.controls[controlName].hasError(errorName);
  }
  get formArr() {
    return this.achatTravauxForm.get('detailStock') as FormArray;
  }
  onSubmit() {

    if (!this.editMode) {
      if (this.personne.type === 'MANAGER') {
        this.detailAticleStockGenerale = JSON.parse(localStorage.getItem('materiau'));
        this.achatTravaux = {
          libelle: this.detailAticleStockGenerale.libelleMateriaux,
          date: new  Date(),
          projetId: this.projetId,
          detailAchatTravaux: [
            {
              libelleMateriaux: this.detailAticleStockGenerale.libelleMateriaux,
              prixUnitaire: this.detailAticleStockGenerale.prixUnitaire,
              quantite: parseInt(this.quantiteInput.nativeElement.value),
              projetId: this.projetId
            }
          ]
        };


      } else if (this.personne.type === 'EMPLOYE') {
        this.achatTravaux = {


        };
      }

      console.log('Voir detail stock', this.achatTravaux);
      //localStorage.removeItem('materiau');
      this.projetService.getProjetById(this.projetId)
        .subscribe(res => {

            this.achatTravauxService.ajoutAchatTravaux(this.achatTravaux)
              .subscribe(data => {
                if (data.status === 0){
                  localStorage.removeItem('materiau');
                  this.achatTravaux = data.body;
                  this.notificationService.warn('Enregistrement effectué avec succès');
                }
              });
            this.achatTravauxForm.reset();


        });
    }

  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.achatTravauxForm.value));
  }
}
