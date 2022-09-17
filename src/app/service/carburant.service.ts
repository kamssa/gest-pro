import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Resultat} from '../model/resultat';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {Carburant} from '../model/carburant';

@Injectable({
  providedIn: 'root'
})
export class CarburantService {


  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    date: new FormControl('',[Validators.required] ),
    prixUnitaire: new FormControl(''),
    quantite: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      date: '',
      prixUnitaire: '',
      quantite: ''
    });
  }
  getCarburantByIdEntreprise(id: number): Observable<Resultat<Carburant[]>> {
    return this.http.get<Resultat<Carburant[]>>
    (`${environment.apiUrl}/api/getVehiculeByidEntreprise/${id}`);

  }
  getCarburantByVehiculeByEntreprise(id: number): Observable<Resultat<Carburant[]>> {
    return this.http.get<Resultat<Carburant[]>>
    (`${environment.apiUrl}/api/getVehiculeByidEntreprise/${id}`);

  }

  ajoutCarburatByVehicule(vehicule: Carburant): Observable<Resultat<Carburant>> {
    return this.http.post<Resultat<Carburant>>(`${environment.apiUrl}/api/vehicule`,
      vehicule)
      .pipe(
        tap(res => {
          this.log(`dep ajoute =${res.body}`);
        }),
        catchError(this.handleError)
      );

  }
  modifCarburantByVehicule(vehicule: Carburant): Observable<Resultat<Carburant>> {
    return this.http.put<Resultat<Carburant>>(`${environment.apiUrl}/api/vehicule`,
      vehicule)
      .pipe(
        tap(res => {
          this.log(`dep modifié =${res.body}`);
        }),
        catchError(this.handleError)
      );
  }



  supprimerCarburantByVehicule(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/vehicule/${id}`);

  }
  /*rechercheDepartementParMc(mc: string, nom: string): Observable<Array<Departement>> {
    return this.http.get<Resultat<Array<Departement>>>(`${environment.apiUrl}/api/rechercheDepmc/?mc=${mc}&nom=${nom}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Array<Projet>>('rechercheTravauxParMc'))
      );

  }*/

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