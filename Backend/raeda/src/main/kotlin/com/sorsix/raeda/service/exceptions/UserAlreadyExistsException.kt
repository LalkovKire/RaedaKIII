package com.sorsix.raeda.service.exceptions

import java.lang.RuntimeException

class UserAlreadyExistsException(val identifier: String, val type: String) : RuntimeException()