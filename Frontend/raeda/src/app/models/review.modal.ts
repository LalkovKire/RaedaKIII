import {User} from "./user.model";

export interface ReviewModal {
  totalRating: number,
  reviews: Review[]
}

export interface Review {
  reviewID: number,
  rating: number,
  description: string,
  user: User
}
