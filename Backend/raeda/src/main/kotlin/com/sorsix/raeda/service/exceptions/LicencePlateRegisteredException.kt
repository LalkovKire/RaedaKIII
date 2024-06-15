package com.sorsix.raeda.service.exceptions

class LicencePlateRegisteredException(val id: Long, val lp: String) : RuntimeException()