import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

import {catchError, tap} from 'rxjs/operators';
import {Versement} from '../model/Versement';
import {Projet} from '../model/projet';


@Injectable({
  providedIn: 'root'
})
export class VersementService {
// observables sources
  private versementCreerSource = new Subject<Resultat<Versement>>();
  private versementModifSource = new Subject<Resultat<Versement>>();
  private versementFiltreSource = new Subject<string>();
  private versementSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  versementCreer$ = this.versementCreerSource.asObservable();
  versementModif$ = this.versementModifSource.asObservable();
  versementFiltre$ = this.versementFiltreSource.asObservable();
  versementSupprime$ = this.versementSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  getVersementByTravaux(id: number): Observable<Resultat<Versement>> {
    return this.http.get<Resultat<Versement>>(`${environment.apiUrl}/api/versementByIdTravaux/${id}`);
  }
  ajoutVersement(versement: Versement): Observable<Resultat<Versement>> {
    console.log('methode du service qui ajoute un travail', versement);
    return this.http.post<Resultat<Versement>>
    (`${environment.apiUrl}/api/versement`, versement)
      .pipe(
        tap(res => {
          this.log(`versement crée =${res.body}`);
          this.versementCreer(res);
        }),
        catchError(this.handleError<Resultat<Versement>>('ajoutVersement'))
      );

  }


  versementCreer(res: Resultat<Versement>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.versementCreerSource.next(res);
  }

  clientModif(res: Resultat<Versement>) {
    this.versementModifSource.next(res);
  }

  filtreVersement(text: string) {
    this.versementFiltreSource.next(text);
  }
  clientsupprime(res: Resultat<boolean>){
    this.versementSupprimeSource.next(res);
  }
  private log(message: string) {
    this.messageService.add('travauxService: ' + message);

  }

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
