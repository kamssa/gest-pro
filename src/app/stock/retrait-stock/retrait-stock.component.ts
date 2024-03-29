import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Stock} from '../../model/Stock';
import {Materiaux} from '../../model/Materiaux';
import {Employe} from '../../model/Employe';
import {Observable} from 'rxjs';
import {StockService} from '../../service/stock.service';
import {CategorieService} from '../../service/categorie.service';
import {MaterielService} from '../../service/materiel.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../service/employe.service';
import {DetailStockService} from '../../service/detail-stock.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-retrait-stock',
  templateUrl: './retrait-stock.component.html',
  styleUrls: ['./retrait-stock.component.scss']
})
export class RetraitStockComponent implements OnInit {
  stockForm: FormGroup;
  editMode = false;
  stock: Stock;
  detailStock: any;
  detailStockInit: any;
  montant: number;
  materiaux: Materiaux [];
  materiau: Materiaux;
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
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @ViewChild("fournisseur", {static: false}) fournisseurInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;
  id: number;
  myControl = new FormControl();
  constructor(private  fb: FormBuilder,
              private stockService: StockService,
              private categorieService: CategorieService,
              private materielService: MaterielService,
              public dialog: MatDialog,
              private router: Router,
              private authService: AuthService,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService,
              @Inject(MAT_DIALOG_DATA) public data: Stock,
              private employeService: EmployeService,
              private detailStockService: DetailStockService,
              private route: ActivatedRoute) {


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
            console.log( this.personne);
            this.nav = true;
            this.categorieService.getMatByIdEntreprise(this.personne.departement.entreprise.id).subscribe(data => {

                this.materiaux = data.body;
                this.filteredOptions = this.myControl.valueChanges.pipe(

                  startWith(''),
                  map(value => (typeof value === 'string' ? value : value.libelle)),
                  map(libelle => (libelle ? this.filter(libelle) : this.materiaux.slice())),
                );
              });


            if (this.data['stock']){
              this.editMode = true;

              this.stockService.getStockById(this.data['stock'])
                .subscribe(result => {

                  this.stock = result.body;
                  console.log('Voir le stock', this.stock);
                  this.detailStockInit = new FormArray([]);
                  if (this.stock.detailStock.length !== 0) {
                    for (const detailStock of this.stock.detailStock) {
                      this.detailStockInit.push(
                        this.fb.group({
                          id: detailStock.id,
                          version: detailStock.version,
                          libelleMateriaux: detailStock.libelleMateriaux,
                          unite: detailStock.unite,
                          prixUnitaire: detailStock.prixUnitaire,
                          quantite: detailStock.quantite,
                          montant: detailStock.montant,
                          frais: detailStock.frais,
                          fournisseur: this.fb.group({
                            id: detailStock.fournisseur.id,
                            version: detailStock.fournisseur.version,
                            libelle: detailStock.fournisseur.libelle
                          }),
                        })
                      );
                    }
                  }
                  this.stockForm = this.fb.group({
                    id: this.stock.id,
                    version: this.stock.version ,
                    libelle: this.stock.libelle ,
                    date: this.stock.date,
                    montant: this.stock.montant,
                    entreprise: this.stock.entreprise,
                    dettailStock: this.detailStockInit,
                  });
                });
            } else {
              this.initForm();
            }

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


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelleMateriaux: [''],
      prixUnitaire: [''],
      unite: [''],
      quantite: ['', Validators.required],
      montant: [''],
      frais: [''],
      categorie: [''],
      fournisseur: this.fb.group({
        id: [''],
        version: [''],
        libelle: ['']
      }),
    });
  }
  initForm() {
    this.stockForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      date: '',
      montant: '',
      entreprise: '',
      detailStock: this.fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.stockForm.get('detailStock') as FormArray;
  }
  onSubmit() {

    if (!this.editMode) {
      this.materiau = JSON.parse(localStorage.getItem('materiau'));

      this.stock = {
        libelle: this.materiau.categorie.libelle,
        entreprise: this.personne.departement.entreprise,
        detailStock: [
          {
            libelleMateriaux: this.materiau.libelle,
            unite: this.materiau.unite,
            prixUnitaire: parseInt(this.valueInput.nativeElement.value),
            quantite: parseInt(this.quantiteInput.nativeElement.value),
            frais: parseInt(this.fraisInput.nativeElement.value),
            categorie: this.materiau.categorie,
            fournisseur: {
              id: null,
              version: null,
              libelle: this.fournisseurInput.nativeElement.value
            },
          }
        ]
      };
      console.log('Voir stock retourne', this.stock);


      localStorage.removeItem('materiau');
      this.stockService.ajoutStock(this.stock)
        .subscribe(data => {
          if (data.status === 0){
            localStorage.removeItem('materiau');
            this.stock = data.body;
            this.notificationService.warn('Enregistrement effectué avec succès');
            this.router.navigate(['/listDetailStock', this.personne.departement.entreprise.id]);
          }
        });

    }else {
      this.materiau = JSON.parse(localStorage.getItem('materiau'));

      this.stock = {
        id: null,
        version: null,
        libelle: this.materiau.categorie.libelle,
        entreprise: this.personne.departement.entreprise,
        detailStock: [
          {
            id: null,
            version: null,
            libelleMateriaux: this.materiau.libelle,
            unite: this.materiau.unite,
            prixUnitaire: parseInt(this.valueInput.nativeElement.value),
            quantite: parseInt(this.quantiteInput.nativeElement.value),
            frais: parseInt(this.fraisInput.nativeElement.value),
            categorie: this.materiau.categorie,
            fournisseur: {
              id: null,
              version: null,
              libelle: this.fournisseurInput.nativeElement.value
            },
          }
        ]
      };
      localStorage.removeItem('materiau');
      console.log('Voir stock retourne', this.stock);
    }

  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.stockForm.value));
  }

  retour() {
    this.router.navigate(['/listDetailStock', this.personne.departement.entreprise.id]);
  }
}
