package com.sorsix.raeda.api.controllerAdvice

import com.sorsix.raeda.domain.errorResponse.AlreadyExistsError
import com.sorsix.raeda.domain.errorResponse.NotFoundError
import com.sorsix.raeda.domain.errorResponse.WrongFormatError
import com.sorsix.raeda.service.exceptions.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class UserControllerAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFound(e: UserNotFoundException) =
        ResponseEntity(NotFoundError(description = "The user with id ${e.id} was not found"), HttpStatus.NOT_FOUND)

    @ExceptionHandler(UserAlreadyExistsException::class)
    fun handleUserAlreadyExists(e: UserAlreadyExistsException) =
        ResponseEntity(
            AlreadyExistsError(description = "The user with ${e.identifier}: ${e.type} already exists"),
            HttpStatus.BAD_REQUEST
        )

    @ExceptionHandler(WrongPhoneNumberFormatException::class)
    fun handlePhoneNumberException(e: WrongPhoneNumberFormatException) =
        ResponseEntity(
            WrongFormatError(description = "Number should start with: \"070\", \"071\", \"072\", \"073\", \"074\", \"075\", \"076\", \"077\", \"078\", \"079\""),
            HttpStatus.BAD_REQUEST
        )

    @ExceptionHandler(WrongEmailFormatException::class)
    fun handleWrongEmailException(e: WrongEmailFormatException) =
        ResponseEntity(WrongFormatError(description = "The email provided is not valid"), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(InvalidAuthenticationException::class)
    fun handleAuthenticationException(e : InvalidAuthenticationException) =
        ResponseEntity(NotFoundError(description = e.msg),HttpStatus.UNAUTHORIZED)

    @ExceptionHandler(UserNotFoundByEmailException::class)
    fun handleUserNotFoundByEmailException(e : UserNotFoundByEmailException) =
        ResponseEntity(NotFoundError(description = "User with the email ${e.email} was not found"),HttpStatus.NOT_FOUND)
}
