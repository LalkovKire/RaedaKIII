package com.sorsix.raeda.api.util

import com.sorsix.raeda.api.response.*
import com.sorsix.raeda.domain.*

fun Rental.toRentalResponse() = RentalResponse(
    rentalID = this.rentalID,
    pickupTime = this.pickupTime,
    dropOffTime = this.dropOffTime,
    car = this.car.toCarResponse(),
    location = this.location.toLocationResponse(),
    rentalDuration = this.rentalDuration,
    totalPrice = this.totalPrice
)

fun Location.toLocationResponse() = LocationResponse(
    locationId = this.locId,
    locationName = this.locationName,
    locationAddress = this.locationAddress
)

fun User.toUserResponse() = UserResponse(
    firstName = this.firstName,
    lastName = this.lastName,
    email = this.email,
    phoneNumber = this.phoneNumber
)

fun Car.toCarResponse() = CarResponse(
    carID, image, gearBox,
    model, licensePlate, yearMade,
    seats, status, price,
    engine, carType, doors,
    fuelType, brand, location.toLocationResponse()
)

fun Review.toReviewResponse() = ReviewResponse(
    reviewID = this.reviewId,
    rating = this.rating,
    rental = this.rental.toRentalResponse(),
    user = this.user.toUserResponse(),
    description = this.description
)

fun test() {

};