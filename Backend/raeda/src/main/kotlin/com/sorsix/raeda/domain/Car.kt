package com.sorsix.raeda.domain

import com.sorsix.raeda.api.response.CarResponse
import com.sorsix.raeda.domain.enumerations.CarStatus
import jakarta.persistence.*

@Entity
@Table(name = "car")
data class Car(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carid")
    val carID: Long,

    @Column(nullable = false)
    var image: String,

    @Column(name = "gearbox", nullable = false)
    var gearBox: String,

    @Column(nullable = false)
    var model: String,

    @Column(name = "licenseplate", nullable = false, unique = true)
    var licensePlate: String,

    @Column(name = "yearmade", nullable = false)
    var yearMade: Int,

    @Column(nullable = false)
    var seats: Int,

    @Column(nullable = false)
    var status: CarStatus,

    @Column(nullable = false)
    var price: Int,

    @Column(nullable = false)
    var engine: String,

    @Column(name = "cartype", nullable = false)
    var carType: String,

    @Column(name = "doors", nullable = false)
    var doors: Int,

    @Column(name = "fueltype", nullable = false)
    var fuelType: String,

    @Column(name = "brand", nullable = false)
    var brand: String,

    @ManyToOne
    @JoinColumn(name = "locationid")
    var location: Location

)


