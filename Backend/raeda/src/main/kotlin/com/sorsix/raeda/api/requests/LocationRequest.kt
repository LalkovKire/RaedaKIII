package com.sorsix.raeda.api.requests

import org.jetbrains.annotations.NotNull

data class LocationRequest (

    @NotNull
    val locationName: String,

    @NotNull
    val locationAddress: String
)