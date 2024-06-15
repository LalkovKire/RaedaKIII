package com.sorsix.raeda.service.exceptions

class CarPickupDateException(override val message: String = "Cannot pick up the car on this date. Please choose a different date.") :
    RuntimeException()