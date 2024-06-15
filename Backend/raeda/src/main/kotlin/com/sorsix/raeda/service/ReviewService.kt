package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.ReviewEditRequest
import com.sorsix.raeda.api.requests.ReviewRequest
import com.sorsix.raeda.api.response.CarReviewSummary
import com.sorsix.raeda.api.response.ReviewResponse
import com.sorsix.raeda.api.util.toReviewResponse
import com.sorsix.raeda.domain.Review
import com.sorsix.raeda.repository.ReviewRepository
import com.sorsix.raeda.service.exceptions.ReviewInvalidDateException
import com.sorsix.raeda.service.exceptions.ReviewNotFoundException
import com.sorsix.raeda.service.exceptions.UserAlreadyLeftReviewException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class ReviewService(
    private val reviewRepository: ReviewRepository,
    private val rentalService: RentalService,
    private val userService: UserService,
) {

    fun createReviewForRentedCar(review: ReviewRequest): ReviewResponse {
        val user = this.userService.findUserByEmail(review.userEmail)

        val rental = this.rentalService.getRentalById(review.rentalID)

        if (rental.dropOffTime > LocalDateTime.now())
            throw ReviewInvalidDateException()

        val checkUserReviews =
            this.reviewRepository.checkIfUserHasAlreadyReviewed(rental.user.userId, rental.car.carID)

        if (checkUserReviews.isNotEmpty()) {
            val username = rental.user.firstName.plus(" ").plus(rental.user.lastName)
            val car = rental.car.brand.plus(" ").plus(rental.car.model)
            throw UserAlreadyLeftReviewException(username, car)
        }

        return this.reviewRepository.save(Review(
            0L,
            LocalDateTime.now(),
            review.rating,
            review.description,
            user,
            rental
        )).toReviewResponse()
    }

    fun getTotalReviewsForCar(id: Long): CarReviewSummary {
        val reviews = this.reviewRepository.findByCarId(id)

        val totalRating = calcTotalRating(reviews)

        val reviewResponses = reviews.map { it.toReviewResponse() }

        return CarReviewSummary(
            totalRating = totalRating,
            reviews = reviewResponses
        )
    }

    private fun calcTotalRating(reviews: List<Review>): Double {
        return if (reviews.isEmpty())
            0.0
        else
            reviews.sumOf { it.rating.toDouble() } / reviews.size
    }

    fun findReviewById(id: Long) =
        this.reviewRepository.findByIdOrNull(id)
            ?: throw ReviewNotFoundException(id)

    fun editReview(id: Long, review: ReviewEditRequest): ReviewResponse {
        val fetchReview = this.findReviewById(id)

        fetchReview.apply {
            this.rating = review.rating
            this.description = review.description
        }

        return this.reviewRepository.save(fetchReview).toReviewResponse()
    }

    fun deleteReview(id: Long) : ReviewResponse {
        val review = this.findReviewById(id)
        this.reviewRepository.deleteById(id)
        return review.toReviewResponse()
    }
}