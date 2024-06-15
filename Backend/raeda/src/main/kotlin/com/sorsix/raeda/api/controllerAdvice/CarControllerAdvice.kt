package com.sorsix.raeda.api.controllerAdvice

import com.sorsix.raeda.domain.errorResponse.AlreadyExistsError
import com.sorsix.raeda.domain.errorResponse.NotAvailableError
import com.sorsix.raeda.domain.errorResponse.NotFoundError
import com.sorsix.raeda.domain.errorResponse.WrongFormatError
import com.sorsix.raeda.service.exceptions.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class CarControllerAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(CarNotFoundException::class)
    fun handleCarNotFound(e: CarNotFoundException) =
        ResponseEntity(NotFoundError(description = "The car with id ${e.id} was not found"), HttpStatus.NOT_FOUND)

    @ExceptionHandler(LocationNotFoundException::class)
    fun handleLocationNotFound(e: LocationNotFoundException) =
        ResponseEntity(NotFoundError(description = "The location with id ${e.id} was not found."), HttpStatus.NOT_FOUND)

    @ExceptionHandler(CarNotAvailableException::class)
    fun handleCarNotAvailableException(e: CarNotAvailableException) =
        ResponseEntity(
            NotAvailableError(description = "The car with id ${e.id} is not available at the moment"),
            HttpStatus.NOT_ACCEPTABLE
        )

    @ExceptionHandler(LicencePlateRegisteredException::class)
    fun handleLicensePlateException(e: LicencePlateRegisteredException) =
        ResponseEntity(
            AlreadyExistsError(description = "The license plate: ${e.lp} is already registered to another car"),
            HttpStatus.BAD_REQUEST
        )

    @ExceptionHandler(WrongUrlFormatException::class)
    fun handleLicensePlateException(e: WrongUrlFormatException) =
        ResponseEntity(WrongFormatError(description = "Invalid url format"), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(CarPickupDateException::class)
    fun handleCarPickupDateException(e: CarPickupDateException) = ResponseEntity(e.message, HttpStatus.BAD_REQUEST)

    @ExceptionHandler(CarDropOffDateException::class)
    fun handleDropOffDateException(e: CarPickupDateException) = ResponseEntity(e.message, HttpStatus.BAD_REQUEST)

    @ExceptionHandler(WrongOTPCode::class)
    fun handleDropOffDateException(e: WrongOTPCode) = ResponseEntity(e.message, HttpStatus.BAD_REQUEST)
}