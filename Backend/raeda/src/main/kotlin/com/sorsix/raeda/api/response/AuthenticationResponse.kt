package com.sorsix.raeda.api.response

import com.sorsix.raeda.domain.enumerations.Role

data class AuthenticationResponse(
    val accessToken: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val role: Role
)