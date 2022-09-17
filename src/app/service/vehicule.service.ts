import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, Subject, throwError} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, tap} from 'rxjs/operators';
import {Vehicule} from '../model/vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private vehiculeCreerSource = new Subject<Resultat<Vehicule>>();
  private vehiculeModifSource = new Subject<Resultat<Vehicule>>();
  private vehiculeFiltreSource = new Subject<string>();


// observables streams
  vehiculeCreer$ = this.vehiculeCreerSource.asObservable();
  vehiculeModif$ = this.vehiculeModifSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    chauffeur: new FormControl('',[Validators.required] ),
    matriculation: new FormControl(''),
    couleur: new FormControl(''),
    marque: new FormControl(''),

  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      chauffeur: '',
      matriculation: '',
      couleur: '',
      marque: '',
    });
  }
  getVehiculeByIdEntreprise(id: number): Observable<Resultat<Vehicule[]>> {
    return this.http.get<Resultat<Vehicule[]>>
    (`${environment.apiUrl}/api/getVehiculeByidEntreprise/${id}`);

  }

  ajoutVehicule(vehicule: Vehicule): Observable<Resultat<Vehicule>> {
    return this.http.post<Resultat<Vehicule>>(`${environment.apiUrl}/api/vehicule`,
      vehicule)
      .pipe(
        tap(res => {
          this.log(`dep ajoute =${res.body}`);
          this.vehiculeCreer(res);
        }),
        catchError(this.handleError)
      );

  }
  modifVehicule(vehicule: Vehicule): Observable<Resultat<Vehicule>> {
    return this.http.put<Resultat<Vehicule>>(`${environment.apiUrl}/api/vehicule`,
      vehicule)
      .pipe(
        tap(res => {
          this.log(`dep modifié =${res.body}`);
          this.vehiculeModif(res);
        }),
        catchError(this.handleError)
      );
  }
  getVehiculeById(id: number): Observable<Resultat<Vehicule>> {
    return this.http.get<Resultat<Vehicule>>(`${environment.apiUrl}/api/vehicule/${id}`);
  }


  supprimerVehicule(id: number): Observable<any> {
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
  vehiculeCreer(res: Resultat<Vehicule>) {
    this.vehiculeCreerSource.next(res);
  }

  vehiculeModif(res: Resultat<Vehicule>) {
    this.vehiculeModifSource.next(res);
  }

  vehiculeFiltre(text: string) {
    this.vehiculeFiltreSource.next(text);
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
