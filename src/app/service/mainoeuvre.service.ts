import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {LocationTravaux} from '../model/LocationTravaux';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Loyer} from '../model/Loyer';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {MainOeuvre} from '../model/MainOeuvre';
import {DetailMainOeuvre} from '../model/DetailMainDoeuvre';
import {DetailLoyer} from '../model/DetailLoyer';

@Injectable({
  providedIn: 'root'
})
export class MainoeuvreService {
// observables sources
  private travauxCreerSource = new Subject<Resultat<MainOeuvre>>();
  private travauxModifSource = new Subject<Resultat<MainOeuvre>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllMainDoeuvre(): Observable<Resultat<MainOeuvre[]>> {
    return this.http.get<Resultat<MainOeuvre[]>>(`${environment.apiUrl}/api/mainOeuvre`);
  }

  ajoutMainDoeuvre(oeuvre: MainOeuvre): Observable<Resultat<MainOeuvre>> {
    console.log('methode du service qui ajoute une mainOeuvre', oeuvre);
    return this.http.post<Resultat<Loyer>>(`${environment.apiUrl}/api/mainOeuvre`, oeuvre);
  }
  modifMainOeuvreTravaux(oeuvre: MainOeuvre): Observable<Resultat<MainOeuvre>> {
    console.log('methode du service qui modifier Loyer', oeuvre);
    return this.http.put<Resultat<Loyer>>(`${environment.apiUrl}/api/mainOeuvre`, oeuvre);
  }
  getMainOeuvreById(id: MainOeuvre): Observable<Resultat<MainOeuvre>> {
    return this.http.get<Resultat<MainOeuvre>>(`${environment.apiUrl}/api/mainOeuvres/${id}`);
  }
  supprimerMainOeuvre(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/mainOeuvre/${id}`);

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetailMain/${id}/${idDetail}`);

  }
// recuperer achat par id travaux
  getMainOeuvreByTravaux(id: number): Observable<MainOeuvre[]> {
    // @ts-ignore
    return this.http.get<Resultat<MainOeuvre[]>>(`${environment.apiUrl}/api/mainOeuvre/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`location trouve =${res}`))),
        catchError(this.handleError<Resultat<MainOeuvre[]>>('getMainOeuvreByTravaux'))
      );
  }
// recuperer achat par id travaux
  getDetailMainOeuvreByTravaux(id: number): Observable<DetailMainOeuvre[]> {
    // @ts-ignore
    return this.http.get<Resultat<DetailMainOeuvre[]>>(`${environment.apiUrl}/api/detailMainOeuvre/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`location trouve =${res}`))),
        catchError(this.handleError<Resultat<DetailMainOeuvre[]>>('getDetailMainOeuvreByTravaux'))
      );
  }
  getDetailMainDoeuvreMontantByTravaux(id: number): Observable<any> {
    // @ts-ignore
    return this.http.get<Resultat<any>>(`${environment.apiUrl}/api/montantMainDoeuvre/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<any>('getAchatTravauxByTravaux'))
      );
  }
  getMainDoeuvreByDateTravaux( dateDebut: string, dateFin: string, travauxId: number): Observable<DetailMainOeuvre[]> {
    // @ts-ignore
    return this.http.get<Resultat<DetailMainOeuvre[]>>(
      `${environment.apiUrl}/api/detailMainDate?dateDebut=${dateDebut}&dateFin=${dateFin}&travauxId=${travauxId}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Resultat<DetailMainOeuvre[]>>('getAchatTravauxByTravaux'))
      );
  }
  travauxCreer(res: Resultat<LocationTravaux>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<LocationTravaux>) {
    this.travauxModifSource.next(res);
  }

  filtreTravaux(text: string) {
    this.travauxFiltreSource.next(text);
  }

  travauxsupprime(res: Resultat<boolean>) {
    this.travauxSupprimeSource.next(res);
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
