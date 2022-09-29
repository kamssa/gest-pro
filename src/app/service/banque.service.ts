import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Employe} from '../model/Employe';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Banque} from '../model/Banque';
import {Departement} from '../model/Departement';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    nom: new FormControl('',[ Validators.required] ),

  });
  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      nom: '',
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }

  getAllBanqueByIdEntreprise(id: number | Resultat<Banque[]> | string | Banque | Resultat<Banque>): Observable<Resultat<Banque[]>> {
    return this.http.get<Resultat<Banque[]>>
    (`${environment.apiUrl}/api/getBanqueByIdEntreprise/${id}`);

  }

  ajoutBanque(banque: number | Resultat<Banque[]> | string | Banque | Resultat<Banque>): Observable<Resultat<Banque>> {
    return this.http.post<Resultat<Banque>>(`${environment.apiUrl}/api/banque`,
      banque);

  }
  modifEmploye(banque: Banque): Observable<Resultat<Banque>> {
    console.log('methode du service qui modifier Employe', banque);
    return this.http.put<Resultat<Banque>>(`${environment.apiUrl}/api/banque`, banque);
  }
  getBanqueById(id: number): Observable<Resultat<Employe>> {
    return this.http.get<Resultat<Employe>>(`${environment.apiUrl}/api/banque/${id}`);
  }
  supprimerBanque(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/banque/${id}`);

  }


  private log(message: string) {
    this.messageService.add('BanqueService: ' + message);

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
