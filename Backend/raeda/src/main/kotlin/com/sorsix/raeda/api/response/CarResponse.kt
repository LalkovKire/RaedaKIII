package com.sorsix.raeda.api.response

import com.sorsix.raeda.domain.enumerations.CarStatus

data class CarResponse(
    val carID: Long,
    val image: String,
    val gearBox: String,
    val model: String,
    val licensePlate: String,
    val yearMade: Int,
    val seats: Int,
    val status: CarStatus,
    val price: Int,
    val engine: String,
    val carType: String,
    val doors: Int,
    val fuelType: String,
    val brand: String,
    val location: LocationResponse,
)