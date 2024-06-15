export class RentalModel {
  constructor(
    public pickupTime: string,
    public dropOffTime: string,
    public carID: number,
    public userEmail: string,
    public locationID: number,
    public otp: number
  ) {
  }
}
