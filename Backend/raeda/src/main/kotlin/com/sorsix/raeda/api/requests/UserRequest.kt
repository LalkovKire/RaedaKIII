package com.sorsix.raeda.api.requests

import com.sorsix.raeda.domain.enumerations.Role
import org.jetbrains.annotations.NotNull

data class UserRequest(

    @NotNull
    val firstName: String,

    @NotNull
    val lastName: String,

    @NotNull
    val email: String,

    @NotNull
    val phoneNumber: String,

    @NotNull
    val userPassword: String,

    val role: Role
)