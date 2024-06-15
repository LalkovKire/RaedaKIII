package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.AuthenticationRequest
import com.sorsix.raeda.api.response.AuthenticationResponse
import com.sorsix.raeda.domain.User
import com.sorsix.raeda.security.JwtProperties
import com.sorsix.raeda.security.TokenService
import com.sorsix.raeda.service.exceptions.InvalidAuthenticationException
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.*

@Service
class AuthenticationService(
    private val authManager: AuthenticationManager,
    private val userDetailsService: CustomUserDetailsService,
    private val tokenService: TokenService,
    private val jwtProperties: JwtProperties,
) {

    fun authentication(authenticationRequest: AuthenticationRequest): AuthenticationResponse {

        try {
            authManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    authenticationRequest.email,
                    authenticationRequest.password
                )
            )
        } catch (e: AuthenticationException) {
            // checks for invalid email
            userDetailsService.loadUserByUsername(authenticationRequest.email)
            throw InvalidAuthenticationException("Wrong password. Try again or click Forgot password to reset it.")
        }
        val user = userDetailsService.loadUserByUsername(authenticationRequest.email) as User
        val accessToken = createAccessToken(user)
        return AuthenticationResponse(
            accessToken = accessToken,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            phoneNumber = user.phoneNumber,
            role = user.role
        )
    }

    private fun createAccessToken(user: UserDetails) = tokenService.generate(
        userDetails = user,
        expirationDate = getAccessTokenExpiration()
    )

    private fun getAccessTokenExpiration(): Date =
        Date(System.currentTimeMillis() + jwtProperties.accessTokenExpiration)
}