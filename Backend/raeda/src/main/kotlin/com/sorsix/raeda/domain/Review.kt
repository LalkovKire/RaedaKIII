package com.sorsix.raeda.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "rentalreview")
data class Review(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewid")
    val reviewId: Long,

    @Column(name = "reviewdate", nullable = false)
    var reviewDate: LocalDateTime,

    @Column(name = "rating", nullable = false)
    var rating: Long,

    @Column(name = "description")
    var description: String,

    @ManyToOne
    @JoinColumn(name = "userid")
    val user: User,

    @ManyToOne
    @JoinColumn(name = "rentalid")
    val rental: Rental
)