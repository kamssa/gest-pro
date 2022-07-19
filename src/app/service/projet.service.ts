import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../model/resultat";
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {MessageService} from "./message.service";
import {Photo} from "../model/Photo";
import {Projet} from '../model/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  urlPhoto = 'http://localhost:8080/api/travauxPhoto';
  // observables sources
  private projetCreerSource = new Subject<Resultat<Projet>>();
  private projetModifSource = new Subject<Resultat<Projet>>();
  private projetFiltreSource = new Subject<string>();
  private projetSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  projetCreer$ = this.projetCreerSource.asObservable();
  projetModif$ = this.projetModifSource.asObservable();
  projetFiltre$ = this.projetFiltreSource.asObservable();
  projetSupprime$ = this.projetSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllProjet(): Observable<Resultat<Projet[]>> {
    return this.http.get<Resultat<Projet[]>>(`${environment.apiUrl}/api/projet`);
  }

  ajoutProjet(travaux: Projet): Observable<Resultat<Projet>> {
    console.log('methode du service qui ajoute un travail', travaux);
    return this.http.post<Resultat<Projet>>(`${environment.apiUrl}/api/projet`, travaux);
  }

  modifierProjet(travauxModif: Projet): Observable<Resultat<Projet>> {
    return this.http.put<Resultat<Projet>>(`${environment.apiUrl}/api/projet`,
      travauxModif)
      .pipe(
        tap(res => {
          this.log(`projet modifier =${res.body}`);
          this.projetModif(res);
        }),
        catchError(this.handleError<Resultat<Projet>>('modifierTravaux'))
      );
  }
  getProjetById(id: number): Observable<Resultat<Projet>> {
    return this.http.get<Resultat<Projet>>(`${environment.apiUrl}/api/projet/${id}`);
  }
  getProjetByIdEntreprise(id: number): Observable<Resultat<Projet[]>> {
    return this.http.get<Resultat<Projet[]>>(`${environment.apiUrl}/api/projetByIdEntreprise/${id}`);
  }
  getProjetByIdClient(id: number): Observable<Resultat<Projet[]>> {
    return this.http.get<Resultat<Projet[]>>(`${environment.apiUrl}/api/projetByIdClient/${id}`);
  }

  rechercheProjetParMc(mc: string, nom: string): Observable<Array<Projet>> {
    return this.http.get<Resultat<Array<Projet>>>(`${environment.apiUrl}/api/rechercheProjetmc/?mc=${mc}&nom=${nom}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Array<Projet>>('rechercheTravauxParMc'))
      );

  }
  // supprimer un travail
  supprimerProjet(id: number): Observable<Resultat<boolean>> {
    return this.http.delete<Resultat<boolean>> (`${environment.apiUrl}/api/travaux/${id}`);
  }
  getPhotoByIdProjet(id: number): Observable<Resultat<Photo[]>> {
    return this.http.get<Resultat<Photo[]>>(`${environment.apiUrl}/api/getPhoto/${id}`);
  }

  upload(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/upload/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  projetCreer(res: Resultat<Projet>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.projetCreerSource.next(res);
  }

  projetModif(res: Resultat<Projet>) {
    this.projetModifSource.next(res);
  }

  filtreProjet(text: string) {
    this.projetFiltreSource.next(text);
  }
  projetSupprime(res: Resultat<boolean>){
    this.projetSupprimeSource.next(res);
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
