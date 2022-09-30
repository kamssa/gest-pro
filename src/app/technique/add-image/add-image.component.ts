import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {catchError, map, switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from 'rxjs';
import {Projet} from '../../model/projet';
import {ProjetService} from '../../service/projet.service';
import {AddDepComponent} from '../../dep/add-dep/add-dep.component';
import {MatDialog} from '@angular/material/dialog';
import {EditeProjetComponent} from '../edite-projet/edite-projet.component';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {
  selectedFile = null;
  projet: Projet;
  projetId: number;
  urls = [];
  panelOpenState = false;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files = [];

  constructor(private uploadService: ProjetService,
              private router: Router,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.uploadService.getProjetById(+params.get('id')))
    ).subscribe(result => {
      this.projet = result.body;
      this.projetId = result.body.id;
      console.log(this.projetId);
      // console.log(this.site);
    });
  }


  uploadFile(file) {
    console.log('Voir les fichiers', file);
    const formData = new FormData();
    formData.append('multipartFile', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData, this.projetId).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  submit(projet: Projet) {
    const dialogRef = this.dialog.open(EditeProjetComponent, {
      data: {
        projet: projet.id
      }

    });
  }
}
