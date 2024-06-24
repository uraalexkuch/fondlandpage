import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {Poslug} from "../fond/models/poslug";

@Injectable({
  providedIn: 'root'
})
export class LoadTradeService {
  baseUrl!: string;
  constructor(private http: HttpClient) { this.baseUrl = (environment as any).baseUrl}

  getPeriodBudget(): Observable<Poslug[]> {
    return this.http.get<Poslug[]>('./assets/data/budgetperiodzvit.json');
  }
  getPeriodResult(): Observable<Poslug[]> {
    return this.http.get<Poslug[]>('./assets/data/resultperiodzvit.json');
  }
}
