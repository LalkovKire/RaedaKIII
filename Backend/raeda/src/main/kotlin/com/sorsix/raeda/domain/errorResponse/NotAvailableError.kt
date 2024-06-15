package com.sorsix.raeda.domain.errorResponse

data class NotAvailableError(
    val response: String = "Not Available",
    val description: String?
)