import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Poslug} from "../fond/models/poslug";

@Injectable({
  providedIn: 'root'
})
export class LoadBudgetService {
  constructor(private http: HttpClient) { }
  getPoslug(): Observable<Poslug[]> {
    return this.http.get<Poslug[]>('./assets/data/budget.json');
  }
}
