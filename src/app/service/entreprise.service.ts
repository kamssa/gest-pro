import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {Resultat} from '../model/resultat';
import {Entreprise} from '../model/Entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
// observables sources
  private entrepriseCreerSource = new Subject<Resultat<Entreprise>>();
  private entrepriseModifSource = new Subject<Resultat<Entreprise>>();
  private entrepriseFiltreSource = new Subject<string>();
  private entrepriseSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  entrepriseCreer$ = this.entrepriseCreerSource.asObservable();
  entrepriseModif$ = this.entrepriseModifSource.asObservable();
  entrepriseFiltre$ = this.entrepriseFiltreSource.asObservable();
  entrepriseSupprime$ = this.entrepriseSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllEntreprise(): Observable<Resultat<Entreprise[]>> {
    return this.http.get<Resultat<Entreprise[]>>(`${environment.apiUrl}/api/entreprise`);
  }

  ajoutEntreprise(entreprise: Entreprise): Observable<Resultat<Entreprise>> {
    console.log('methode du service qui ajoute  entreprise', entreprise);
    return this.http.post<Resultat<Entreprise>>(`${environment.apiUrl}/api/entreprise`, entreprise);
  }
  modifEntreprise(entreprise: Entreprise): Observable<Resultat<Entreprise>> {
    console.log('methode du service qui modifier categorie', entreprise);
    return this.http.put<Resultat<Entreprise>>(`${environment.apiUrl}/api/entreprise`, entreprise);
  }
  getEntrepriseById(id: number): Observable<Resultat<Entreprise>> {
    return this.http.get<Resultat<Entreprise>>(`${environment.apiUrl}/api/entreprise/${id}`);
  }

  supprimerEntreprise(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/entreprise/${id}`);

  }

  entrepriseCreer(res: Resultat<Entreprise>) {
    console.log('entreprise a ete  creer correctement essaie source');
    this.entrepriseCreerSource.next(res);
  }

  entrepriseModif(res: Resultat<Entreprise>) {
    this.entrepriseModifSource.next(res);
  }

  filtreentreprise(text: string) {
    this.entrepriseFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
    this.entrepriseSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('categorieService: ' + message);

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
