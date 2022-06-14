import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {CaisseDetail} from '../model/CaisseDetail';
import {Categorie} from '../model/Categorie';
import {Caisse} from '../model/Caisse';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaisseDetailService {
// observables sources
  private caisseDetailCreerSource = new Subject<Resultat<CaisseDetail[]>>();
  private caisseDetailModifSource = new Subject<Resultat<CaisseDetail[]>>();
  private caisseDetailFiltreSource = new Subject<string>();
  private caisseDetailSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  caisseDetailCreer$ = this.caisseDetailCreerSource.asObservable();
  caisseDetailModif$ = this.caisseDetailModifSource.asObservable();
  caisseDetailFiltre$ = this.caisseDetailFiltreSource.asObservable();
  caisseDetailSupprime$ = this.caisseDetailSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  getCaisseDetailByEntrepriseId(id: number): Observable<Resultat<CaisseDetail[]>> {
    return this.http.get<Resultat<CaisseDetail[]>>
    (`${environment.apiUrl}/api/getCaisseDetailByIdEntreprise/${id}`)
      .pipe(
        tap(res => {
          this.log(`Caisse crée =${res.body}`);
          this.caisseCreer(res);
        }),
        catchError(this.handleError<Resultat<CaisseDetail[]>>('ajoutCaisse'))
      );
  }
  caisseCreer(res: Resultat<CaisseDetail[]>) {
    console.log('Client a ete  creer correctement essaie source');
    this.caisseDetailCreerSource.next(res);
  }

  caisseModif(res: Resultat<CaisseDetail[]>) {
    this.caisseDetailModifSource.next(res);
  }

  filtreCaisse(text: string) {
    this.caisseDetailFiltreSource.next(text);
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
