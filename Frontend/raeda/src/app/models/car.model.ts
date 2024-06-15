import { CarLocation } from '../dashboard/dash-service-object';
import { CarStatus } from './car-status';

export class CarModel {
  constructor(
    public image: string,
    public model: string,
    public carType: string,
    public seats: number,
    public gearBox: string,
    public yearMade: number,
    public doors: number,
    public fuelType: string,
    public engine: string,
    public status: CarStatus,
    public price: number,
    public location: CarLocation,
    public brand: string,
    public carID: number,
    public licensePlate: string
  ) {}
}

export interface CarRequest {
  image: string,
  model: string,
  carType: string,
  seats: number,
  gearBox: string,
  yearMade: number,
  doors: number,
  fuelType: string,
  engine: string,
  price: number,
  locationID: number,
  brand: string,
  licensePlate: string
}
