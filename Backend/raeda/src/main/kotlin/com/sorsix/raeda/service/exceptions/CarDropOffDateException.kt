package com.sorsix.raeda.service.exceptions

class CarDropOffDateException(override val message: String = "Cannot drop off the car on this date. Please choose a different date.") :
    RuntimeException()