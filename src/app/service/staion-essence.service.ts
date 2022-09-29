import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {StationEssence} from '../model/stationEssence';

@Injectable({
  providedIn: 'root'
})
export class StaionEssenceService {
  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    nom: new FormControl('',[Validators.required] ),


  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      nom: '',

    });
  }
  getStationEssenceByIdEntreprise(id: number): Observable<Resultat<StationEssence[]>> {
    return this.http.get<Resultat<StationEssence[]>>
    (`${environment.apiUrl}/api/getStationEssenceByIdEntreprise/${id}`);

  }

  ajoutStationEssence(stationEssence: StationEssence): Observable<Resultat<StationEssence>> {
    console.log('Dans le service', stationEssence);
    return this.http.post<Resultat<StationEssence>>(`${environment.apiUrl}/api/stationEssence`,
      stationEssence)
      .pipe(
        tap(res => {
          this.log(`dep ajoute =${res.body}`);
        }),
        catchError(this.handleError)
      );

  }
  modifStationEssence(vehicule: StationEssence): Observable<Resultat<StationEssence>> {
    return this.http.put<Resultat<StationEssence>>(`${environment.apiUrl}/api/stationEssence`,
      vehicule)
      .pipe(
        tap(res => {
          this.log(`dep modifié =${res.body}`);
        }),
        catchError(this.handleError)
      );
  }
  getStationEssenceById(id: number): Observable<Resultat<StationEssence>> {
    return this.http.get<Resultat<StationEssence>>(`${environment.apiUrl}/api/stationEssence/${id}`);
  }


  supprimerStationEssence(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/stationEssence/${id}`);

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
