package com.sorsix.raeda.api.controllerAdvice

import com.sorsix.raeda.domain.errorResponse.NotFoundError
import com.sorsix.raeda.domain.errorResponse.WrongFormatError
import com.sorsix.raeda.service.exceptions.ReviewInvalidDateException
import com.sorsix.raeda.service.exceptions.ReviewNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ReviewControllerAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(ReviewNotFoundException::class)
    fun handleReviewNotFound(e: ReviewNotFoundException) =
        ResponseEntity(
            NotFoundError(
                description = "The review with id ${e.id} was not found"),
                HttpStatus.NOT_FOUND)

    @ExceptionHandler(ReviewInvalidDateException::class)
    fun handleInvalidReviewDate(e: ReviewInvalidDateException) =
        ResponseEntity(
            WrongFormatError(
                description = "The rental is not finished, can't rate"),
                HttpStatus.BAD_REQUEST)
}