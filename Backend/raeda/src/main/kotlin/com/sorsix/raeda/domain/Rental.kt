package com.sorsix.raeda.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "rental")
data class Rental(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rentalid")
    val rentalID: Long,

    @Column(name = "pickupdate", nullable = false)
    val pickupTime: LocalDateTime,

    @Column(name = "dropoffdate", nullable = false)
    val dropOffTime: LocalDateTime,

    @Column(name = "totalprice", nullable = false)
    val totalPrice: Int,

    @Column(name = "rentalduration")
    val rentalDuration: Int,

    @ManyToOne
    @JoinColumn(name = "userid")
    val user: User,

    @ManyToOne
    @JoinColumn(name = "carid")
    val car: Car,

    @ManyToOne
    @JoinColumn(name = "locationid")
    val location: Location
)