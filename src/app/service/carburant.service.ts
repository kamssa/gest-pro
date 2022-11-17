import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Resultat} from '../model/resultat';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Prestation} from '../model/prestation';

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
    libelle: new FormControl('',[Validators.required] ),
    nomChauffeur: new FormControl(''),
    total: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      date: '',
      libelle: '',
      nomChauffeur: '',
      total: ''
    });
  }
  getCarburantByIdEntreprise(id: number): Observable<Resultat<Prestation[]>> {

    return this.http.get<Resultat<Prestation[]>>
    (`${environment.apiUrl}/api/getCarburantByEntreprise/${id}`);

  }
  getCarburantByVehiculeByEntreprise(id: number): Observable<Resultat<Prestation[]>> {
    return this.http.get<Resultat<Prestation[]>>
    (`${environment.apiUrl}/api/getCarburantByVehicule/${id}`);

  }

  ajoutCarburatByVehicule(carburant: Prestation): Observable<Resultat<Prestation>> {
    return this.http.post<Resultat<Prestation>>(`${environment.apiUrl}/api/carburant`,
      carburant)
      .pipe(
        tap(res => {
          this.log(`dep ajoute =${res.body}`);
        }),
        catchError(this.handleError)
      );

  }
  modifCarburantByVehicule(carburant: Prestation): Observable<Resultat<Prestation>> {
    return this.http.put<Resultat<Prestation>>(`${environment.apiUrl}/api/carburant`,
      carburant)
      .pipe(
        tap(res => {
          this.log(`dep modifié =${res.body}`);
        }),
        catchError(this.handleError)
      );
  }

// recuperer achat par id travaux
  getCarburantByDateVehicule(id: number, dateDebut: string, dateFin: string): Observable<Prestation[]> {
    // @ts-ignore
    return this.http.get<Resultat<Prestation[]>>(
      `${environment.apiUrl}/api/carburantDateParVehicule?IdVehicule=${id}&dateDebut=${dateDebut}&dateFin=${dateFin}`);

  }

  supprimerCarburantByVehicule(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/carburant/${id}`);

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
