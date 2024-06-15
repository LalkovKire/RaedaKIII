package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.response.RentalResponse
import com.sorsix.raeda.service.RentalService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/rental")
class RentalController(private val rentalService: RentalService) {

    @GetMapping
    fun getAllRentals(): List<RentalResponse> =
        this.rentalService.getAllRentals()
}