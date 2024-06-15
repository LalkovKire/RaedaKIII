package com.sorsix.raeda.repository

import com.sorsix.raeda.domain.Review
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ReviewRepository : JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r JOIN r.rental ren WHERE ren.car.carID = :carId")
    fun findByCarId(@Param("carId") carId: Long): List<Review>

    @Query("SELECT r FROM Review r JOIN r.rental ren" +
            " WHERE ren.car.carID = :carId AND ren.user.userId = :userId")
    fun checkIfUserHasAlreadyReviewed(
        @Param("userId")userId: Long,
        @Param("carId") carId: Long) : List<Review>
}