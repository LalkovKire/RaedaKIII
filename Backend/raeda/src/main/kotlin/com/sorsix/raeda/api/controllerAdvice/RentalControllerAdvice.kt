package com.sorsix.raeda.api.controllerAdvice

import com.sorsix.raeda.domain.errorResponse.NotFoundError
import com.sorsix.raeda.service.exceptions.RentalNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class RentalControllerAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(RentalNotFoundException::class)
    fun handleRentalNotFoundException(e: RentalNotFoundException) =
        ResponseEntity(
            NotFoundError(description = "The rental with id: ${e.id} was not found"),
            HttpStatus.BAD_REQUEST)
}