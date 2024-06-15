package com.sorsix.raeda.service

import com.sorsix.raeda.repository.UserRepository
import com.sorsix.raeda.service.exceptions.InvalidAuthenticationException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service


@Service
class CustomUserDetailsService(private val userRepository: UserRepository) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val found = userRepository.findByEmail(username)

        return found ?: throw InvalidAuthenticationException("Could’t find your Account")
    }

}