import { Injectable } from '@angular/core';
import { Price } from './filter-form';

@Injectable({
  providedIn: 'root',
})
export class DefaultSelectionValuesService {
  readonly locations = ['All', 'Skopje', 'Strumica', 'Kavadarci'];
  readonly prices: Price[] = [
    { title: 'All', amount: 0 },
    { title: 'Under 200€', amount: 200 },
    { title: 'Under 400€', amount: 400 },
    { title: 'Under 600€', amount: 600 },
    { title: 'Under 800€', amount: 800 },
    { title: 'Under 1000€', amount: 1000 },
  ];
  readonly brands = ['Porsche', 'Audi', 'Mercedes', 'BMW', 'Ford', 'Toyota'];
  readonly years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  readonly fuels = ['All', 'Petrol', 'Diesel'];
  readonly gears = ['All', 'Manual', 'Automatic'];
  readonly minDate = () => new Date();
}
