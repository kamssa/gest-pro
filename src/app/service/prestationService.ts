import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {PrestationStation} from '../model/PrestationStation';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    typePrestation: new FormControl('', [Validators.required] ),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: '',
      version: '' ,
      typePrestation: '',

    });
  }
  getAllPrestationStation(): Observable<Resultat<PrestationStation[]>> {
    return this.http.get<Resultat<PrestationStation[]>>(`${environment.apiUrl}/api/prestationStation`);
  }
  getPrestationStationById(id: number): Observable<Resultat<PrestationStation>> {
    return this.http.get<Resultat<PrestationStation>>(`${environment.apiUrl}/api/prestationStation/${id}`);
  }
  supprimerPrestationStation(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/prestationStation/${id}`);

  }
  populateForm(id) {
    this.form.patchValue(id);
  }

  private log(message: string) {
    this.messageService.add('clientService: ' + message);

  }
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // recuper les erreurs
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
