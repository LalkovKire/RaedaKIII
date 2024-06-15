export class ReviewReq {
  constructor(public rating: number,
              public description: string,
              public userEmail: string,
              public rentalID: number) {
  }
}
