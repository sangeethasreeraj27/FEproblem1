import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';

export const ApiConstants = Object.freeze({
  getPlanets: "planets",
  getVehicles: "vehicles",
  getToken: "token",
  findFalcon: "find"
})

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ExecuteGet(url: string, urlParam?: string, queryParams?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.get(url, { params: queryParams });
  }

  ExecutePost(url: string, body?: any, queryParams?: HttpParams, urlParam?: string): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.post(url, body, { params: queryParams });
  }

}
