import { Injectable } from '@angular/core';
import {Departement} from '../model/Departement';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, map, tap} from 'rxjs/operators';
import {Projet} from '../model/projet';

@Injectable({
  providedIn: 'root'
})
export class DepService {
  private depCreerSource = new Subject<Resultat<Departement>>();
  private depModifSource = new Subject<Resultat<Departement>>();
  private depFiltreSource = new Subject<string>();


// observables streams
  depCreer$ = this.depCreerSource.asObservable();
  depModif$ = this.depModifSource.asObservable();


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
          this.depCreer(res);
        }),
        catchError(this.handleError<Resultat<Departement>>('ajoutDepartement'))
      );

  }
  modifDepartement(departement: Departement): Observable<Resultat<Departement>> {
    return this.http.put<Resultat<Departement>>(`${environment.apiUrl}/api/departement`,
      departement)
      .pipe(
        tap(res => {
          this.log(`dep modifié =${res.body}`);
          this.depModif(res);
        }),
        catchError(this.handleError<Resultat<Departement>>('modifDepartement'))
      );
  }
  getDepartementById(id: number): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/departement/${id}`);
  }
  getDepartementByNom(libelle: string): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/getdocumentByLibelle/${libelle}`);
  }
  getDepByIdEntreprise(id: number): Observable<Resultat<Departement[]>> {
    return this.http.get<Resultat<Departement[]>>(`${environment.apiUrl}/api/getDepartementByidEntreprise/${id}`);
  }

  supprimerDepartement(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/departement/${id}`);

  }
  rechercheDepartementParMc(mc: string, nom: string): Observable<Array<Departement>> {
    return this.http.get<Resultat<Array<Departement>>>(`${environment.apiUrl}/api/rechercheDepmc/?mc=${mc}&nom=${nom}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Array<Projet>>('rechercheTravauxParMc'))
      );

  }

  populateForm(id) {
    this.form.patchValue(id);
  }
  depCreer(res: Resultat<Departement>) {
    this.depCreerSource.next(res);
  }

  depModif(res: Resultat<Departement>) {
    this.depModifSource.next(res);
  }

  filtreDep(text: string) {
    this.depFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('clientService: ' + message);

  }
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // recuper les erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
