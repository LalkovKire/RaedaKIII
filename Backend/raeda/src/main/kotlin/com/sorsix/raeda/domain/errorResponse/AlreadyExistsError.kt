package com.sorsix.raeda.domain.errorResponse

data class AlreadyExistsError(
    val error: String = "The object already exists in the database",
    val description: String?
)