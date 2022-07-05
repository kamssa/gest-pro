import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Travaux} from '../model/travaux';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Employe} from '../model/Employe';
import {Client} from '../model/Client';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
// observables sources
  private clientCreerSource = new Subject<Resultat<Travaux>>();
  private clientModifSource = new Subject<Resultat<Travaux>>();
  private clientFiltreSource = new Subject<string>();
  private clientSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  clientCreer$ = this.clientCreerSource.asObservable();
  clientModif$ = this.clientModifSource.asObservable();
  clientFiltre$ = this.clientFiltreSource.asObservable();
  clientSupprime$ = this.clientSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  getClientById(id: number): Observable<Resultat<Client>> {
    return this.http.get<Resultat<Client>>(`${environment.apiUrl}/api/auth/client/${id}`);
  }
  modifClient(client: Client): Observable<Resultat<Client>> {
    console.log('methode du service qui modifie un client', client);
    return this.http.put<Resultat<Client>>
    (`${environment.apiUrl}/api/auth/client`,
      client).pipe(
      tap(res => {
        this.log(`Client modifié =${res.body}`);
        this.clientModif(res);
      }),
      catchError(this.handleError<Resultat<Client>>('modifClient'))
    );
  }
  clientCreer(res: Resultat<Travaux>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.clientCreerSource.next(res);
  }

  clientModif(res: Resultat<Travaux>) {
    this.clientModifSource.next(res);
  }

  filtreClient(text: string) {
    this.clientFiltreSource.next(text);
  }
  clientsupprime(res: Resultat<boolean>){
    this.clientSupprimeSource.next(res);
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
