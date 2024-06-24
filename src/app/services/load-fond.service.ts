import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class LoadFondService {
  baseUrl!: string;
  constructor(private http: HttpClient) { this.baseUrl = (environment as any).baseUrl }
  getFond(): Observable<any> {
    return this.http.post(//'http://localhost:3000/base/getfond/'
      `${this.baseUrl}/base/getfond/`
      , {});
  }


}
