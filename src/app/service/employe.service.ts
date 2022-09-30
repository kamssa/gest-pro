import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {Employe} from '../model/Employe';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {


  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    email: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    fonction: new FormControl(''),
    suspendu: new FormControl(''),
    actevated: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      password: '',
      fonction: '',
      suspendu: '',
      actevated: '',

    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }

  getEmployeByIdEntreprise(id: number): Observable<Resultat<Employe[]>> {
    return this.http.get<Resultat<Employe[]>>
    (`${environment.apiUrl}/api/listEmployeParEntreprise/${id}`);
  }
  ajoutEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un employe', employe);
    return this.http.post<Resultat<Employe>>
    (`${environment.apiUrl}/api/signupEmpl`,
      employe).pipe(
      tap(res => {
        this.log(`Client crée =${res.body}`);
      }),
      catchError(this.handleError<Resultat<Employe>>('ajoutClient'))
    );
  }
  modifEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui modifie un employe', employe);
    return this.http.put<Resultat<Employe>>
    (`${environment.apiUrl}/api/employe`,
      employe).pipe(
      tap(res => {
        this.log(`Client modifié =${res.body}`);
      }),
      catchError(this.handleError<Resultat<Employe>>('modifClient'))
    );
  }
  /*public setEmployeActivated(employe: Employe): Observable<Resultat<Employe>>{
    console.log(employe);
    // @ts-ignore
    return this.http.put<Resultat<Employe>>(`${environment.apiUrl}/api/employe/${employe}`);
  }*/

  rechercheEmployeParMc(mc: string, nom: string): Observable<Array<Employe>> {
    return this.http.get<Resultat<Array<Employe>>>(`${environment.apiUrl}/api/rechercheEmployemc/?mc=${mc}&nom=${nom}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Array<Employe>>('rechercheTravauxParMc'))
      );

  }
  // supp
  getEmployeById(id: number): Observable<Resultat<Employe>> {
    return this.http.get<Resultat<Employe>>(`${environment.apiUrl}/api/employe/${id}`);
  }
  deleteEmployeById(id: number): Observable<Resultat<Employe>> {
    return this.http.delete<Resultat<Employe>>(`${environment.apiUrl}/api/employe/${id}`);
  }


  addRoleToEmploye(idEmploye: number, idRole: number): Observable<Resultat<Employe>> {

    return this.http.get<Resultat<Employe>>(`${environment.apiUrl}/api/addRoleToEmploye/?idEmploye=${idEmploye}&idRole=${idRole}`);
  }

  private log(message: string) {
    this.messageService.add('employeService: ' + message);

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
