package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.ReviewEditRequest
import com.sorsix.raeda.api.requests.ReviewRequest
import com.sorsix.raeda.api.util.toReviewResponse
import com.sorsix.raeda.service.ReviewService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/review")
class ReviewController(
    private val reviewService: ReviewService) {

    @PostMapping
    fun leaveReviewForRentedCar(@RequestBody @Validated review: ReviewRequest) =
        this.reviewService.createReviewForRentedCar(review)

    @GetMapping("/total/{id}")
    fun getTotalReviewsForCar(@PathVariable id: Long) =
        this.reviewService.getTotalReviewsForCar(id)

    @GetMapping("/{id}")
    fun getReviewById(@PathVariable id: Long) =
        this.reviewService.findReviewById(id).toReviewResponse()

    @PutMapping("/{id}")
    fun editReview(
        @PathVariable id: Long,
        @RequestBody @Validated review: ReviewEditRequest) =
        this.reviewService.editReview(id,review)

    @DeleteMapping("/{id}")
    fun deleteReview(@PathVariable id: Long) =
        this.reviewService.deleteReview(id)
}