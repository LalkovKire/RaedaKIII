package com.sorsix.raeda.service.exceptions

import java.lang.RuntimeException

class CarNotFoundException(val id: Long) : RuntimeException()