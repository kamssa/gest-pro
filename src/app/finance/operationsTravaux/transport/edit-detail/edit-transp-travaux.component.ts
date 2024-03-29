import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Transport} from "../../../../model/Transport";
import {TransportService} from "../../../../service/transport.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NotificationService} from '../../../../helper/notification.service';

@Component({
  selector: 'app-edit-transp-travaux',
  templateUrl: './edit-transp-travaux.component.html',
  styleUrls: ['./edit-transp-travaux.component.scss']
})
export class EditTranspTravauxComponent implements OnInit {
  transportForm: FormGroup;
  editMode = false;
  montantdetail: number;
  transport: Transport;
  detailTransportInit: any;
  @Input() projetId: number;
  now = Date.now();
  public errorMessage: string = '';
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @Output() change = new EventEmitter<number>();


  constructor(private  fb: FormBuilder, private  router: Router,
              private transportService: TransportService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: Transport) {
  }

  ngOnInit(): void {
    if (this.data['transport']){
      this.editMode = true;
      this.transportService.getTransportById(this.data['transport'])
        .subscribe(result => {
          console.log('Voir la modif', result.body);
          this.transport = result.body;
          this.detailTransportInit = new FormArray([]);
          if (this.transport.detailTransport.length !== 0) {
            for (const detailTransport of this.transport.detailTransport) {
              this.detailTransportInit.push(
                this.fb.group({
                  id: detailTransport.id,
                  version: detailTransport.version,
                  libelle: detailTransport.libelle,
                  montant: detailTransport.montant,
                  date: detailTransport.date
                })
              );
            }
          }
          this.transportForm = this.fb.group({
            id: this.transport.id,
            version: this.transport.version,
            libelle: this.transport.libelle,
            detailTransport: this.detailTransportInit,
          });
        });
    } else {
      this.initForm();
    }

  }


  initForm() {
    this.transportForm = this.fb.group({
      id: '',
      version: '',
      montant: '',
      date: '',
      projetId: '',
      detailTransport: this.fb.array([this.initItemRows()])
    });

  }

  get formArr() {
    return this.transportForm.get('detailTransport') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelle: ['', Validators.required],
      montant: ['', Validators.required],
      date: ['']
    });
  }
  onSubmit() {
    let formValue = this.transportForm.value;
    console.log(formValue['detailTransport']);
    // console.log(formValue.itemsRows);
    let transport = new Transport(null,
      null,
      'Transport',
      null,
      null,
      this.projetId,
      formValue['detailTransport']);
    this.transportService.ajoutTransport(transport).subscribe(data => {
      this.notificationService.warn('Enregistrement effectué avec succès');
      console.log(data.body);
    }, error => {
      //this.errorHandler.handleError(error);
      //  this.errorMessage = this.errorHandler.errorMessage;
      console.log('desole');
    });

    console.log('voir les transports', transport);
    this.transportForm.reset();
  }

  addNewRows() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
}
