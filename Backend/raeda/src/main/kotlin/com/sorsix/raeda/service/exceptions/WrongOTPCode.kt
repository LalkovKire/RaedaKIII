package com.sorsix.raeda.service.exceptions

class WrongOTPCode(override val message: String = "Wrong OTP Code") :
    RuntimeException() {
}