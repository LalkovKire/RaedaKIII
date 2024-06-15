package com.sorsix.raeda.api.requests

import org.jetbrains.annotations.NotNull

data class ReviewEditRequest(

    @NotNull
    val rating: Long,

    val description: String
)