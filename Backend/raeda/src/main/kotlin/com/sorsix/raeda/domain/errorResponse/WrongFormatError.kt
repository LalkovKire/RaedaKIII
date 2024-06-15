package com.sorsix.raeda.domain.errorResponse

data class WrongFormatError(

    val error: String = "The format of the object is not correct",
    val description: String
)