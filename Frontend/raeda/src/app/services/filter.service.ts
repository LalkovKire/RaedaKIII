import {inject, Injectable, signal} from '@angular/core';
import {DefaultSelectionValuesService} from "../components/filter-sidebar/default-selection-values.service";
import {DateService} from "./date.service";
import {FilterForm} from "../components/filter-sidebar/filter-form";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private defaultSelectionValuesService = inject(DefaultSelectionValuesService);
  private dateService = inject(DateService);
  toggle = signal(false);

  constructor() {
  }


  buildQueryParams(values: FilterForm) {
    let params = {};

    if (values.selectedLocation !== 'All')
      params = { ...params, location: values.selectedLocation };

    if (
      this.dateService.convertDateToString(values.selectedPickupDate) !==
      this.dateService.convertDateToString(this.dateService.getCurrentDate())
    )
      params = {
        ...params,
        pickupDate: this.dateService.convertDateToString(
          values.selectedPickupDate
        ),
      };

    if (values.selectedPrice.amount !== 0)
      params = { ...params, price: values.selectedPrice.amount };

    if (
      values.selectedBrands.length > 0 &&
      values.selectedBrands.length <
      this.defaultSelectionValuesService.brands.length
    )
      params = { ...params, brand: values.selectedBrands.slice().join(',') };

    if (
      values.selectedYears.length > 0 &&
      values.selectedYears.length <
      this.defaultSelectionValuesService.years.length
    )
      params = { ...params, year: values.selectedYears.slice().join(',') };

    if (values.selectedFuel !== 'All')
      params = { ...params, fuel: values.selectedFuel };

    if (values.selectedGear !== 'All')
      params = { ...params, gear: values.selectedGear };

    if (values.selectedAvailability)
      params = { ...params, availableOnly: true };

    return params;
  }
}
