package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.api.util.toCarResponse
import com.sorsix.raeda.service.CarService
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cars")
class CarController(private val carService: CarService) {

    @GetMapping
    fun getAllCars(@PageableDefault(size = 15) pageable: Pageable) =
        this.carService.getAllCars(pageable)

    @GetMapping("/{id}")
    fun getCarById(@PathVariable id: Long) =
        this.carService.getCarById(id).toCarResponse()

    @GetMapping("/{id}/rentals")
    fun getRentalDates(@PathVariable id: Long) =
        this.carService.getRentalDates(id)

    @PostMapping
    fun addNewCar(@RequestBody @Validated car: CarRequest) =
        this.carService.addCar(car)

    @DeleteMapping("/{id}")
    fun deleteCarById(@PathVariable id: Long) =
        this.carService.deleteCar(id)

    @GetMapping("/latest")
    fun getLatestInventory() =
        this.carService.getLatestInventory()

    @PostMapping("/rent")
    fun preRentCar(@RequestBody @Validated phoneNumber: String) =
        carService.preRentCar(phoneNumber)

    @PostMapping("/rent/otp")
    fun rentCar(@RequestBody @Validated rental: RentalRequest) =
        carService.rentCar(rental)

    @GetMapping("/filter")
    fun filterCars(@RequestParam params: Map<String, String>) =
        this.carService.filterCars(params)

    @PutMapping("/edit/{id}")
    fun editCarById(@PathVariable id: Long, @RequestBody @Validated car: CarRequest) =
        this.carService.editCar(id, car)

}