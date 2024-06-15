package com.sorsix.raeda.service.exceptions

class UserNotFoundByEmailException(val email: String) : RuntimeException()