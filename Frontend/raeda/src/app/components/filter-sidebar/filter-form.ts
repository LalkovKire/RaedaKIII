export interface Price {
  title: string;
  amount: number;
}

export interface FilterForm {
  selectedLocation: string;
  selectedPickupDate: Date;
  selectedPrice: Price;
  selectedBrands: string[];
  selectedYears: number[];
  selectedFuel: string;
  selectedGear: string;
  selectedAvailability: boolean;
}
