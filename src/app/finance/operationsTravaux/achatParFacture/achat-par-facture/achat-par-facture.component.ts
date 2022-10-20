import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AutreAchatTravaux} from '../../../../model/AutreAchatTravaux';
import {Employe} from '../../../../model/Employe';
import {Observable} from 'rxjs';
import {Materiaux} from '../../../../model/Materiaux';
import {Projet} from '../../../../model/projet';
import {CategorieService} from '../../../../service/categorie.service';
import {AutreAchatTravauxService} from '../../../../service/autre-achat-travaux.service';
import {DetailAticleStockGeneralService} from '../../../../service/detail-aticle-stock-general.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../../service/auth.service';
import {ProjetService} from '../../../../service/projet.service';
import {DialogConfirmService} from '../../../../helper/dialog-confirm.service';
import {NotificationService} from '../../../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {EmployeService} from '../../../../service/employe.service';
import {switchMap} from 'rxjs/operators';
import {AchatParFacture} from '../../../../model/AchatParFacture';

@Component({
  selector: 'app-achat-par-facture',
  templateUrl: './achat-par-facture.component.html',
  styleUrls: ['./achat-par-facture.component.scss']
})
export class AchatParFactureComponent implements OnInit {
  achatTravauxParactureForm: FormGroup;
  editMode = false;
  achatParFacture: AchatParFacture;
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
  @ViewChild("dat", {static: false}) dateInput: ElementRef;
  @ViewChild("libelleMateriaux", {static: false}) libelleMateriauxInput: ElementRef;
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @ViewChild("fournisseur", {static: false}) fournisseurInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;
  materiaux: Materiaux [];
  materiau: Materiaux;
  myControl = new FormControl();
  projet: Projet;
  projetId: number;
  startDate: Date;

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
            });

              this.initForm();


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

    return this.materiaux.filter(option => option.libelle.toLowerCase().includes(filterValue));
  }
  displayFn(mat: Materiaux): string {
    this.selected = mat && mat.libelle ? mat.libelle : '';
    this.materiau = mat;
    localStorage.setItem('materiau', JSON.stringify(mat));
    console.log(this.materiau);
    return mat && mat.libelle;
  }
  getCalcul() {
    return  this.montantInput.nativeElement.value = this.valueInput.nativeElement.value * this.quantiteInput.nativeElement.value +
      parseInt(this.fraisInput.nativeElement.value);
  }


  initForm() {
    this.achatTravauxParactureForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      date: '',
      montant: '',
      projetId: '',
    });

  }

  searchFor() {
    console.log(this.startDate.toString());
  }
  onSubmit() {

    if (!this.editMode) {
      this.materiau = JSON.parse(localStorage.getItem('materiau'));
      let formValue = this.achatTravauxParactureForm.value;

      let achatParFacture = new AchatParFacture(
        null,
        null,
        this.libelleMateriauxInput.nativeElement.value,
        null,
        null,
        this.projetId,
      );

      console.log('Voir Autre stock retourne', achatParFacture);
      this.autreAchatTravauxService.ajoutAutreAchatTravaux(achatParFacture)
        .subscribe(data => {
          if (data.status === 0){
            localStorage.removeItem('materiau');
            this.achatParFacture = data.body;
            this.notificationService.warn('Enregistrement effectué avec succès');
          }
        });
      this.achatTravauxParactureForm.reset();


    }
    localStorage.removeItem('materiau');
  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.achatTravauxParactureForm.value));
  }
}
