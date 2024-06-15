package com.sorsix.raeda.api.requests

data class AuthenticationRequest(
    val email: String,
    val password: String,
)