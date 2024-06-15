package com.sorsix.raeda.api.response

import java.time.LocalDateTime

data class RentalDates(
    val pickup: LocalDateTime,
    val dropOff: LocalDateTime
)
