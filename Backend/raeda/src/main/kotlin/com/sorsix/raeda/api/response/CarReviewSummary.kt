package com.sorsix.raeda.api.response

data class CarReviewSummary(
    val totalRating: Double,
    val reviews: List<ReviewResponse>
)