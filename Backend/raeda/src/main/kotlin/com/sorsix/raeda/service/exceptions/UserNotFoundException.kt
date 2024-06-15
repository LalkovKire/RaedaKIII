package com.sorsix.raeda.service.exceptions

import java.lang.RuntimeException

class UserNotFoundException(val id: Long) : RuntimeException()