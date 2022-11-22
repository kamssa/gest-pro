import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Autres} from '../../../../model/Autres';
import {AutresService} from '../../../../service/autres.service';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {Employe} from '../../../../model/Employe';
import {Observable} from 'rxjs';
import {Materiaux} from '../../../../model/Materiaux';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DialogConfirmService} from '../../../../helper/dialog-confirm.service';
import {NotificationService} from '../../../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../../../service/employe.service';
import {DetailAutres} from '../../../../model/DetailAutres';
import {map, switchMap} from 'rxjs/operators';
import {StepperOrientation} from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ProjetService} from '../../../../service/projet.service';
import {Projet} from '../../../../model/projet';
import {AuthService} from '../../../../service/auth.service';

@Component({
  selector: 'app-edit-autredepense-travaux',
  templateUrl: './edit-autredepense-travaux.component.html',
  styleUrls: ['./edit-autredepense-travaux.component.scss']
})
export class EditAutredepenseTravauxComponent implements OnInit {
  autreDepenseForm: FormGroup;
  editMode = false;
  autre: Autres;
  detailAutres: DetailAutres;
  detailAutresInit: any;
  montant: number;
  stepperOrientation: Observable<StepperOrientation>;
  now = Date.now();
  personne: any;
  array: any;
  roles: any;
  employe: Employe;
  employes: Employe[];
  res: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  public errorMessage: string = '';
  @ViewChild("dat", {static: false}) dateInput: ElementRef;
  @ViewChild("employe", {static: false}) employeInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("designation", {static: false}) designationInput: ElementRef;
  @ViewChild("prixUnitaire", {static: false}) prixUnitaireInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @ViewChild("nomPrenom", {static: false}) nomPrenomInput: ElementRef;
  @ViewChild("picker", {static: false}) pickerInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;
  projet: Projet;
  @Input() projetId: number;
  myControl = new FormControl();
  constructor(private  fb: FormBuilder,
              private  autresService: AutresService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux,
              private employeService: EmployeService,
              private projetService: ProjetService,
              private route: ActivatedRoute,
              breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

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
            if (this.data['detailAutres']){
              this.editMode = true;
              this.autresService.getAutresById(this.data['detailAutres'])
                .subscribe(result => {

                  this.autre = result.body;
                  this.detailAutresInit = new FormArray([]);
                  if (this.autre.detailAutres.length !== 0) {
                    for (const detailAutreTravaux of this.autre.detailAutres) {
                      this.detailAutresInit.push(
                        this.fb.group({
                          id: detailAutreTravaux.id,
                          version: detailAutreTravaux.version,
                          date: detailAutreTravaux.date,
                          designation: detailAutreTravaux.designation,
                          prixUnitaire: detailAutreTravaux.prixUnitaire,
                          quantite: detailAutreTravaux.quantite,
                          montant: detailAutreTravaux.montant,
                          nomPrenom: detailAutreTravaux.nomPrenom,
                          projetId: detailAutreTravaux.projetId
                        })
                      );
                    }
                  }
                  this.autreDepenseForm = this.fb.group({
                    id: this.autre.id,
                    version: this.autre.version ,
                    libelle: this.autre.libelle ,
                    montant: this.autre.montant,
                    date: this.autre.date,
                    projetId: this.autre.projetId,
                    detailAutres: this.detailAutresInit,
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
    return  this.montantInput.nativeElement.value = this.prixUnitaireInput.nativeElement.value * this.quantiteInput.nativeElement.value;
  }


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      date:  ['', Validators.required],
      designation: ['', Validators.required],
      prixUnitaire: ['', Validators.required],
      quantite: ['', Validators.required],
      montant: [''],
      nomPrenom: [''],
      projetId: ['']

    });
  }
  initForm() {
    this.autreDepenseForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      montant: '',
      date: '',
      projetId: '',
      detailAutres: this.fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.autreDepenseForm.get('detailAutres') as FormArray;
  }
  onSubmit() {

    if (!this.editMode) {
        let formValue = this.autreDepenseForm.value;
        let autre = new  Autres(
          null,
          null,
          this.designationInput.nativeElement.value,
          null,
          new Date,
          this.projetId,
          formValue['detailAutres']

        );
        console.log('Voir autre retourne', autre);
        this.autresService.ajoutAutres(autre)
          .subscribe(data => {
            if (data.status === 0){
              this.autre = data.body;
              this.notificationService.warn('Enregistrement effectué avec succès');
              this.autreDepenseForm.reset();
            }
          });

    }
    localStorage.removeItem('materiau');
  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.autreDepenseForm.value));
  }

  greetDep(event) {
    console.log('Voir le select', event.value);
    this.employeService.getEmployeById(event.value).subscribe(data => {
      this.employe = data.body;
      console.log('valeur de retour de ville', this.employe);
    });
  }
}
