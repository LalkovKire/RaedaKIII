package com.sorsix.raeda.api.requests

import org.jetbrains.annotations.NotNull
import java.time.LocalDateTime

data class RentalRequest(

    @NotNull
    val pickupTime: LocalDateTime,

    @NotNull
    val dropOffTime: LocalDateTime,

    @NotNull
    val carID: Long,

    @NotNull
    val userEmail: String,

    @NotNull
    val locationID: Long,

    @NotNull
    val otp: Int,
)