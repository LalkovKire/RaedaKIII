import { CarModel } from "../models/car.model";

export interface DashObject {
    imageUrl: String;
    name: String;
    routeLink: String;
}

export interface CarLocation {
    locationId: number;
    locationName: string;
    locationAddress: string;
}

export interface CarLocationRequest {
    locationName: string;
    locationAddress: string;
}

export interface DashRental {
    rentalID: number,
    pickupTime: Date,
    dropOffTime: Date,
    car: CarModel,
    rentalDuration: number,
    totalPrice: number,
    location: CarLocation
}
