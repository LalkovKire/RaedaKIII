package com.sorsix.raeda.service

import com.sorsix.raeda.api.util.toRentalResponse
import com.sorsix.raeda.api.response.RentalResponse
import com.sorsix.raeda.repository.RentalRepository
import com.sorsix.raeda.service.exceptions.RentalNotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class RentalService(
    private val rentalRepository: RentalRepository) {

    fun getAllRentals(): List<RentalResponse> =
        this.rentalRepository.findAll().map {
            it.toRentalResponse()
        }

    fun getRentalById(id: Long) =
        this.rentalRepository.findByIdOrNull(id)
            ?: throw RentalNotFoundException(id)

}