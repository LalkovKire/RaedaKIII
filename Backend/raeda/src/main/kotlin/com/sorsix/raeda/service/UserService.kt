package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.UserRequest
import com.sorsix.raeda.api.response.UserResponse
import com.sorsix.raeda.domain.User
import com.sorsix.raeda.repository.UserRepository
import com.sorsix.raeda.api.util.toRentalResponse
import com.sorsix.raeda.api.util.toUserResponse
import com.sorsix.raeda.service.exceptions.*
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.regex.Pattern

@Service
class UserService(private val userRepository: UserRepository, private val encoder: PasswordEncoder) {

    fun createUser(user: UserRequest): UserResponse {

        if (!checkPhoneNumber(user.phoneNumber))
            throw WrongPhoneNumberFormatException()

        if (!validateEmail(user.email))
            throw WrongEmailFormatException()

        if (this.userRepository.existsByEmail(user.email))
            throw UserAlreadyExistsException("email",user.email)

        if (this.userRepository.existsByPhoneNumber(user.phoneNumber))
            throw UserAlreadyExistsException("phone number", user.phoneNumber)

       return this.userRepository.save(
                User(
                    0L,
                    user.firstName,
                    user.lastName,
                    user.email,
                    formatNumber(user.phoneNumber),
                    encoder.encode(user.userPassword),
                    role = user.role,
                    listOf()
                )
            ).toUserResponse()
    }

    fun findUserById(id: Long) =
        userRepository.findByIdOrNull(id)
            ?: throw UserNotFoundException(id)

    fun findUserByEmail(email: String) =
        this.userRepository.findByEmail(email)
            ?: throw UserNotFoundByEmailException(email)

    fun deleteUserById(id: Long) =
        this.userRepository.deleteById(id)


    fun findAllUsers(): List<UserResponse> =
        this.userRepository.findAll().map {
        UserResponse(
            it.firstName,
            it.lastName,
            it.email,
            it.phoneNumber
        )
    }

    fun getUserRentalsById(id: Long) =
      this.findUserById(id).rentals.map { it.toRentalResponse() }

    fun getUserRentalsByEmail(email: String) =
        this.findUserByEmail(email).rentals.map { it.toRentalResponse() }


    private fun checkPhoneNumber(number: String): Boolean {
        val prefixSet = listOf("070", "071", "072", "073", "074", "075", "076", "077", "078", "079")
        val prefix = number.substring(0, 3)
        val tmp = formatNumber(number)
        if (prefixSet.contains(prefix) && tmp.length == 9) {
            val postfix = tmp.substring(3, 9).toLongOrNull()
            if (postfix != null) return true
        }
        return false
    }

    private fun formatNumber(number: String) =
        number.replace(Regex("[./\\-\\s]"), "")

    private fun validateEmail(email: String): Boolean {
        val regexPattern = ("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
        return patternMatches(email, regexPattern)
    }

    fun patternMatches(emailAddress: String, regexPattern: String): Boolean {
        return Pattern.compile(regexPattern)
            .matcher(emailAddress)
            .matches()
    }

}