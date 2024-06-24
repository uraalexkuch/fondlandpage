import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoadInfografService {
  baseUrl!: string;
  constructor(private http: HttpClient) { this.baseUrl = (environment as any).baseUrl}

  getInfo():  Observable<any> {
    return this.http.get(
      //'http://localhost:3000/base/getstat/'
      `${this.baseUrl}/base/infografika/`
    );
  }
}
