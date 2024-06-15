package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.api.response.CarResponse
import com.sorsix.raeda.api.response.RentalDates
import com.sorsix.raeda.api.response.RentalResponse
import com.sorsix.raeda.api.util.toCarResponse
import com.sorsix.raeda.api.util.toRentalResponse
import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.Rental
import com.sorsix.raeda.domain.User
import com.sorsix.raeda.domain.enumerations.CarStatus
import com.sorsix.raeda.repository.CarRepository
import com.sorsix.raeda.repository.RentalRepository
import com.sorsix.raeda.repository.UserRepository
import com.sorsix.raeda.service.exceptions.*
import com.vonage.client.VonageClient
import com.vonage.client.sms.messages.TextMessage
import jakarta.transaction.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.net.MalformedURLException
import java.net.URL
import java.time.Duration
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import kotlin.random.Random


@Service
class CarService(
    private val carRepository: CarRepository,
    private val userRepository: UserRepository,
    private val locationService: LocationService,
    private val rentalRepository: RentalRepository,
    private val userService: UserService
) {
    var otp = 1_000

    fun getAllCars(pageable: Pageable) =
        carRepository.findAll(pageable).map {
            it.toCarResponse()
        }

    fun getCarById(id: Long) = carRepository.findByIdOrNull(id)
        ?: throw CarNotFoundException(id)

    @Transactional
    fun addCar(car: CarRequest): CarResponse {

        val location = this.locationService.getLocationById(car.locationID)

        if (checkLicencePlate(car.licensePlate)) {
            val fetchCar = this.carRepository.getCarByLicensePlate(car.licensePlate)
            throw LicencePlateRegisteredException(fetchCar.carID, car.licensePlate)
        }

        if (!this.isUrlValid(car.image))
            throw WrongUrlFormatException()

        return this.carRepository.save(
            Car(
                0L,
                car.image,
                car.gearBox,
                car.model,
                car.licensePlate,
                car.yearMade,
                car.seats,
                CarStatus.AVAILABLE,
                car.price,
                car.engine,
                car.carType,
                car.doors,
                car.fuelType,
                car.brand,
                location
            )
        ).toCarResponse()
    }

    fun getLatestInventory() = this.carRepository.getLatestInventory()

    fun deleteCar(id: Long): CarResponse {
        val tmp = this.getCarById(id)
        this.carRepository.deleteById(id)
        return tmp.toCarResponse()
    }


    fun preRentCar(phoneNumber: String) {
        println(phoneNumber)
        val client = VonageClient.builder().apiKey("373e08ae").apiSecret("APPMc8QjUYJzslqf").build()
        otp = generateOTP()
        val number = phoneNumber.substring(1)

        val message = TextMessage(
            "Raeda",
            "389$number",
            "Your OTP for renting is: $otp. Please use this code to confirm your rental booking. Thank you"
        )

        println(otp)

//        client.smsClient.submitMessage(message)

    }

    @Transactional
    fun rentCar(rental: RentalRequest): RentalResponse {
        if (rental.otp != otp)
            throw WrongOTPCode()

        val user = this.userService.findUserByEmail(rental.userEmail)

        val car = this.getCarById(rental.carID)

        if (this.rentalRepository.findRentalByCarAndDate(rental.carID, rental.pickupTime).isNotEmpty())
            throw CarPickupDateException()

        if (this.rentalRepository.findRentalByCarAndDate(rental.carID, rental.dropOffTime).isNotEmpty())
            throw CarDropOffDateException()

        val location = this.locationService.getLocationById(rental.locationID)
        val rentalDuration =
            calculateRentalDuration(rental.pickupTime, rental.dropOffTime)

        return this.rentalRepository.save(
            Rental(
                0L,
                rental.pickupTime,
                rental.dropOffTime,
                calcPrice(rentalDuration, car.price),
                rentalDuration,
                user,
                car,
                location
            )
        ).toRentalResponse()
    }

    fun checkLicencePlate(licensePlate: String) =
        this.carRepository.existsByLicensePlate(licensePlate)

    @Transactional
    fun editCar(id: Long, car: CarRequest): CarResponse {

        val fetchCar = this.getCarById(id)
        val fetchLocation = this.locationService.getLocationById(car.locationID)

        fetchCar.apply {
            this.image = car.image
            this.gearBox = car.gearBox
            this.model = car.model
            this.licensePlate = car.licensePlate
            this.yearMade = car.yearMade
            this.seats = car.seats
            this.price = car.price
            this.engine = car.engine
            this.carType = car.carType
            this.doors = car.doors
            this.fuelType = car.fuelType
            this.brand = car.brand
            this.location = fetchLocation
        }

        return this.carRepository.save(fetchCar).toCarResponse()
    }

    fun calculateRentalDuration(pickupDate: LocalDateTime, dropOffDate: LocalDateTime): Int {
        if (pickupDate == dropOffDate) return 1

        val duration = Duration.between(pickupDate, dropOffDate)

        return duration.toDays().toInt() + 2
    }

    fun findExpiredRentals(): List<Rental> {
        val currentTime = LocalDateTime.now()
        return rentalRepository.findExpiredRentals(currentTime)
    }

    fun updateCarStatus(carID: Long) {
        val tmp = this.getCarById(carID)
        if (tmp.status == CarStatus.RENTED)
            tmp.status = CarStatus.AVAILABLE
        else
            tmp.status = CarStatus.RENTED
        this.carRepository.save(tmp)
    }


    fun calcPrice(rentalDuration: Int, price: Int) =
        (rentalDuration * price) + 10

    fun filterCars(filters: Map<String, String>): Page<CarResponse> {
        val page = filters["page"]?.toIntOrNull() ?: 0
        val size = filters["size"]?.toIntOrNull() ?: 10
        val pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "carid"))
        val location = filters["location"]
        var pickupDate = toLocalDate(filters["pickupDate"]) ?: LocalDate.now()
        val price = filters["price"]?.toIntOrNull()
        val brand = filters["brand"]?.split(',') ?: emptyList()
        val year = filters["year"]?.split(",")?.map { it.toInt() } ?: emptyList()
        val fuel = filters["fuel"]
        val gear = filters["gear"]
        val availableOnly = if (filters["availableOnly"] == "true") 0 else null

        if (pickupDate < LocalDate.now())
            pickupDate = LocalDate.now()

        this.carRepository.updateStatus(pickupDate)

        return this.carRepository.getCarByFiltering(
            location,
            price,
            brand,
            year,
            fuel,
            gear,
            availableOnly,
            pageable
        ).map { it.toCarResponse() }
    }

    fun getRentalDates(id: Long): List<RentalDates> {
        val car = getCarById(id)
        return this.rentalRepository.findRentalDates(car)
    }


    private fun isUrlValid(url: String): Boolean {
        return try {
            URL(url).toURI()
            true
        } catch (e: MalformedURLException) {
            false
        }
    }

    private fun toLocalDate(date: String?): LocalDate? {
        val formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy")
        return date?.let { LocalDate.parse(it, formatter) }
    }

    private fun generateOTP() = Random.nextInt(1_000, 10_000)

}