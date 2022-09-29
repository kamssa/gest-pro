import { Injectable } from '@angular/core';
import {Departement} from '../model/Departement';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of, Subject, throwError} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepService {


  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDepartement(): Observable<Resultat<Departement[]>> {
    return this.http.get<Resultat<Departement[]>>(`${environment.apiUrl}/api/departement`);
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    libelle: new FormControl('',[Validators.required] ),
    description: new FormControl(''),

  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      libelle: '',
      description: '',
    });
  }
  ajoutDepartement(departement: Departement): Observable<Resultat<Departement>> {
    return this.http.post<Resultat<Departement>>(`${environment.apiUrl}/api/departement`,
      departement)
      .pipe(
        tap(res => {
          this.log(`dep ajoute =${res.body}`);
        }),
        catchError(this.handleError)
      );

  }
  modifDepartement(departement: Departement): Observable<Resultat<Departement>> {
    return this.http.put<Resultat<Departement>>(`${environment.apiUrl}/api/departement`,
      departement)
      .pipe(
        tap(res => {
          this.log(`dep modifié =${res.body}`);
        }),
        catchError(this.handleError)
      );
  }
  getDepartementById(id: number): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/departement/${id}`);
  }
  getDepartementByNom(libelle: string): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/getdocumentByLibelle/${libelle}`);
  }
  getDepByIdEntreprise(id: number): Observable<Resultat<Departement[]>> {
    return this.http.get<Resultat<Departement[]>>
    (`${environment.apiUrl}/api/getDepartementByidEntreprise/${id}`);

  }

  supprimerDepartement(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/departement/${id}`);

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
        `Serveur distant ne repond pas  ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
