import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CarModel, CarRequest} from '../models/car.model';
import {inject, Injectable, OnInit, signal} from '@angular/core';
import {Params} from '@angular/router';
import {Pageable} from '../models/pageable';
import {Observable} from 'rxjs';
import {DatesModel} from '../models/dates.model';
import {BrowserStorageService} from "./browserStorage.service";
import {ReviewModal} from "../models/review.modal";

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private http = inject(HttpClient);
  private browserStorageService = inject(BrowserStorageService);

  private token: string | null = null;
  private url = 'http://localhost:8080/api/cars';
  isLoading = signal(false);
  error = signal(false);

  constructor() {
    const user = this.browserStorageService.getUser();
    this.token = user?.accessToken || null;
  }


  getAllCars() {
    return this.http.get<CarModel[]>(`${this.url}`);
  }

  getLatestInventory() {
    return this.http.get<CarModel[]>(`${this.url}/latest`);
  }

  getCarsByFiltering(
    params: Params,
    page: number,
    size: number
  ): Observable<Pageable<CarModel>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page.toString());
    queryParams = queryParams.append('size', size.toString());

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }

    return this.http.get<Pageable<CarModel>>(`${this.url}/filter`, {
      params: queryParams,
    });
  }

  addNewCar(car: CarRequest): Observable<CarModel> {
    if (this.token === null)
      throw new Error('Token must be present');

    return this.http.post<CarModel>(`${this.url}`, car, this.addToken());

  }

  editCarById(id: number, car: CarRequest): Observable<CarModel> {
    if (this.token === null)
      throw new Error('Token must be present');

    return this.http.put<CarModel>(`${this.url}/edit/${id}`, car, this.addToken());

  }

  deleteCarById(id: number): Observable<CarModel> {
    if (this.token === null) throw Error('Something went wrong while deleting');

    return this.http.delete<CarModel>(`${this.url}/${id}`, this.addToken());

  }

  getCar(id: number) {
    return this.http.get<CarModel>(`${this.url}/${id}`);
  }

  getCarDates(id: number) {
    return this.http.get<DatesModel[]>(`${this.url}/${id}/rentals`);
  }

  getCarReview(id: number) {
    return this.http.get<ReviewModal>(`http://localhost:8080/api/review/total/${id}`);
  }

  private addToken() {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    };

    return {
      headers: new HttpHeaders(headerDict),
    };
  }

}
