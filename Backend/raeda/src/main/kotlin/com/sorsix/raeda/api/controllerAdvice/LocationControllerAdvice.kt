package com.sorsix.raeda.api.controllerAdvice

import com.sorsix.raeda.domain.errorResponse.AlreadyExistsError
import com.sorsix.raeda.service.exceptions.LocationAddressAlreadyRegisteredException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class LocationControllerAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(LocationAddressAlreadyRegisteredException:: class)
    fun handleLocationAddressAlreadyExists(e : LocationAddressAlreadyRegisteredException) =
        ResponseEntity(
            AlreadyExistsError(
                description = "The location with address: ${e.address} already exists")
            ,HttpStatus.BAD_REQUEST)
}