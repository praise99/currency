import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Converter {
  currency: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCurrency = () => {
    return this.http.get<Converter[]>("http://api.exchangeratesapi.io/v1/latest?access_key=4e5a9c431cc8c6cbc6cc87a34fccca6a& base = USD& symbols = GBP,JPY,EUR");
  };
}