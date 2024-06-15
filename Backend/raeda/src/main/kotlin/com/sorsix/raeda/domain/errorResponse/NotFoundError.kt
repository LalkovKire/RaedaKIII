package com.sorsix.raeda.domain.errorResponse

data class NotFoundError(
    val response: String = "Not Found",
    val description: String?
)