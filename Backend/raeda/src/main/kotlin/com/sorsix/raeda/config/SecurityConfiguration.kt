package com.sorsix.raeda.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.DefaultSecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    private val authenticationProvider: AuthenticationProvider
) {

    @Bean
    fun securityFilterChain(
        http: HttpSecurity,
        jwtAuthenticationFilter: JwtAuthenticationFilter
    ): DefaultSecurityFilterChain {
        http
            .csrf { it.disable() }
            .authorizeHttpRequests {
                it
                    .requestMatchers("/api/auth", "/error")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/loc", "/api/loc/page",
                        "/api/loc/{id}", "/api/review/{id}", "/api/review/total/{id}", "/api/cars", "/api/cars/{id}",
                        "/api/cars/{id}/rentals", "/api/cars/latest", "/api/cars/filter")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST,"/api/user")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/loc", "/api/cars")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/api/loc/edit/{id}", "/api/cars/edit/{id}")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/api/loc/{id}", "/api/cars/{id}")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "/api/rental")
                    .hasRole("ADMIN")
                    .anyRequest()
                    .fullyAuthenticated()
            }
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }
}