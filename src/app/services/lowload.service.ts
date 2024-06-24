import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LowloadService {
  baseUrl!: string;
  constructor(private http: HttpClient) { this.baseUrl = (environment as any).baseUrl}
  getLow(): Observable<any> {
    return this.http.post(
      //'http://localhost:3000/base/getlow/'
      `${this.baseUrl}/base/getlow/`
      , {});
  }
}
