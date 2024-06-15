package com.sorsix.raeda.api.requests

import org.jetbrains.annotations.NotNull

data class ReviewRequest(

    @NotNull
    val rating: Long,

    val description: String,

    @NotNull
    val userEmail: String,

    @NotNull
    val rentalID: Long
)