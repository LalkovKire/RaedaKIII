import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {RentalModel} from '../models/rental.model';
import {Observable} from 'rxjs';
import {DashRental} from '../dashboard/dash-service-object';
import {ReviewReq} from "../models/review-req";
import {BrowserStorageService} from "./browserStorage.service";

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private http = inject(HttpClient);
  private browserStorageService = inject(BrowserStorageService);

  private token: string | undefined;
  private url2 = 'http://localhost:8080/api/cars';
  private url = 'http://localhost:8080/api/rental';

  constructor() {
    this.token = this.browserStorageService.getUser()?.accessToken;
  }

  preRentACar(phoneNumber: string) {
    if (this.token === null)
      throw new Error('Token must be present');

    return this.http.post(`${this.url2}/rent`, phoneNumber, this.addToken());
  }

  rentACar(rentalInformation: RentalModel) {
    if (this.token === null)
      throw new Error('Token must be present');


    return this.http.post(`${this.url2}/rent/otp`, rentalInformation, this.addToken());
  }

  getAllRentals(): Observable<DashRental[]> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };
      return this.http.get<DashRental[]>(`${this.url}`, requestOptions);
    } else throw new Error("Token must be present");
  }

  getUserRentals(email: string) {
    if (this.token === null) return;

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<DashRental[]>(`http://localhost:8080/api/user/rentals?email=${email}`, requestOptions);
  }

  postReview(review: ReviewReq) {
    if (this.token === null) return;

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(`http://localhost:8080/api/review`, review, requestOptions);
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
