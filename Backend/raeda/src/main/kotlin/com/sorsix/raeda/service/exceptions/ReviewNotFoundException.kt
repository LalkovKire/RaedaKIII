package com.sorsix.raeda.service.exceptions

data class ReviewNotFoundException(val id: Long) : RuntimeException()