package com.sorsix.raeda.service

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class RentalDurationScheduler(private val rentalService: CarService) {

    @Scheduled(fixedRate = 5000)
    fun checkExpiredRentals() {
        val expiredRentals = rentalService.findExpiredRentals()
        expiredRentals.forEach { rental ->
            rentalService.updateCarStatus(rental.car.carID)
        }
    }

}