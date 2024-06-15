package com.sorsix.raeda.service.exceptions

data class UserAlreadyLeftReviewException(
    val username: String,
    val car: String) : RuntimeException()