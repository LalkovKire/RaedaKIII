package com.sorsix.raeda.api.response

data class ReviewResponse(
    val reviewID: Long,
    val rating: Long,
    val description: String,
    val user: UserResponse,
    val rental: RentalResponse
)