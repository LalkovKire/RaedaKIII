package com.sorsix.raeda.repository

import com.sorsix.raeda.api.response.RentalDates
import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.Rental
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface RentalRepository : JpaRepository<Rental, Long> {

    @Query("SELECT r FROM Rental r WHERE r.dropOffTime <= :currentTime")
    fun findExpiredRentals(currentTime: LocalDateTime): List<Rental>

    @Query("SELECT NEW com.sorsix.raeda.api.response.RentalDates(r.pickupTime, r.dropOffTime) FROM Rental r WHERE r.car = :car")
    fun findRentalDates(car: Car): List<RentalDates>

    @Query("SELECT r.* FROM rental r WHERE r.carid = :carId AND (:date BETWEEN r.pickupdate AND r.dropoffdate)", nativeQuery = true)
    fun findRentalByCarAndDate(@Param("carId") carId: Long, @Param("date") date: LocalDateTime): List<Rental>
}