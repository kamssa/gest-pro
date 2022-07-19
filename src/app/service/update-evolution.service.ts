import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Projet} from '../model/projet';

@Injectable({
  providedIn: 'root'
})
export class UpdateEvolutionService {

  constructor(private  http: HttpClient, private messageService: MessageService) {

  }

  getEvolution(id: number): Observable<Resultat<Projet>> {
    return this.http.get<Resultat<Projet>>(`${environment.apiUrl}/api/evolution/${id}`);
  }
}
