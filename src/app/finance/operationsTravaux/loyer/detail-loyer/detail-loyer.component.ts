import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoyService} from '../../../../service/loy.service';
import {Loyer} from '../../../../model/Loyer';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NotificationService} from '../../../../helper/notification.service';

@Component({
  selector: 'app-detail-loyer',
  templateUrl: './detail-loyer.component.html',
  styleUrls: ['./detail-loyer.component.scss']
})
export class DetailLoyerComponent implements OnInit {
  loyerForm: FormGroup;
  editMode = false;
  loyer: Loyer;
  detailLoyerTravauxInit: any;
  montant: number;
  montantdetail: number;
  @Input() projetId: number;
  now = Date.now();
  public errorMessage: string = '';
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @Output() change = new EventEmitter<number>();

  constructor(private  fb: FormBuilder,
              private  router: Router,
              private notificationService: NotificationService,
              private loyerService: LoyService,
              @Inject(MAT_DIALOG_DATA) public data: Loyer) {
  }
  ngOnInit(): void {
    if (this.data['loyer']){
      this.editMode = true;
      this.loyerService.getLoyerById(this.data['loyer'])
        .subscribe(result => {
          console.log('Voir la modif', result.body);
          this.loyer = result.body;
          this.detailLoyerTravauxInit = new FormArray([]);
          if (this.loyer.detailLoyer.length !== 0) {
            for (const detailLoyer of this.loyer.detailLoyer) {
              this.detailLoyerTravauxInit.push(
                this.fb.group({
                  id: detailLoyer.id,
                  version: detailLoyer.version,
                  libelle: detailLoyer.libelle,
                  montant: detailLoyer.montant,
                  date: detailLoyer.date,
                  projetId: detailLoyer.projetId
                })
              );
            }
          }
          this.loyerForm = this.fb.group({
            id: this.loyer.id,
            version: this.loyer.version,
            libelle: this.loyer.libelle,
            detailLoyer: this.detailLoyerTravauxInit,
          });
        });
    } else {
      this.initForm();
    }

  }
  initForm() {
    this.loyerForm = this.fb.group({
      id: '',
      version: '',
      montant: '',
      date: '',
      projetId: '',
      detailLoyer: this.fb.array([this.initItemRows()])
    });

  }

  get formArr() {
    return this.loyerForm.get('detailLoyer') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelle: ['', Validators.required],
      montant: ['', Validators.required],
      date: ['', Validators.required],
      projetId: ['']
    });
  }
  onSubmit() {
    let formValue = this.loyerForm.value;
    console.log(formValue['detailLoyer']);
    let loyer = new Loyer(null,
      null,
      'Loyer',
      null,
      new Date(),
      this.projetId,
      formValue['detailLoyer']);
    this.loyerService.ajoutLoyer(loyer).subscribe(data => {
      console.log('Loyer enregistrer', data);
      this.notificationService.warn('Enregistrement effectué avec succès');


    }, error => {
        console.log('desole');
    });

    this.loyerForm.reset();
  }

  addNewRows() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
}
