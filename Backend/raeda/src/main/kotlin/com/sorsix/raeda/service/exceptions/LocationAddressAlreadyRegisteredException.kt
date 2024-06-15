package com.sorsix.raeda.service.exceptions

import java.lang.RuntimeException

class LocationAddressAlreadyRegisteredException(val address : String) : RuntimeException()