import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {CarLocation, CarLocationRequest} from '../dashboard/dash-service-object';
import {Params} from '@angular/router';
import {Pageable} from '../models/pageable';
import {BrowserStorageService} from "./browserStorage.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  private browserStorageService = inject(BrowserStorageService);

  private token: string | undefined;
  private url = "http://localhost:8080/api/loc";

  constructor() {
    this.token = this.browserStorageService.getUser()?.accessToken;
  }

  getAllLocations(): Observable<CarLocation[]> {
    return this.http.get<CarLocation[]>(`${this.url}`);
  }

  getAllLocationsByPagination(
    params: Params,
    page: number,
    size: number): Observable<Pageable<CarLocation>> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page.toString());
    queryParams = queryParams.append('size', size.toString());

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }

    return this.http.get<Pageable<CarLocation>>(`${this.url}/page`, {
      params: queryParams
    });
  }

  addNewLocation(loc: CarLocationRequest): Observable<CarLocation> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      return this.http.post<CarLocation>(`${this.url}`, loc, requestOptions);
    } else
      throw Error("Something went wrong while adding location");
  }

  editLocation(id: number, loc: CarLocationRequest): Observable<CarLocation> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      return this.http.put<CarLocation>(`${this.url}/edit/${id}`, loc, requestOptions);
    } else throw Error("Something went wrong while deleting");
  }

  deleteLocationById(id: number): Observable<CarLocation> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      return this.http.delete<CarLocation>(`${this.url}/${id}`, requestOptions);
    } else throw Error("Something went wrong while deleting");
  }

}
