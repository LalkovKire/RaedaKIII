package com.sorsix.raeda.service.exceptions

data class RentalNotFoundException(val id: Long) : RuntimeException()