package com.sorsix.raeda.api.response

import java.time.LocalDateTime

data class RentalResponse (
    val rentalID: Long,
    val pickupTime: LocalDateTime,
    val dropOffTime: LocalDateTime,
    val car: CarResponse,
    val rentalDuration: Int,
    val totalPrice: Int,
    val location: LocationResponse
)