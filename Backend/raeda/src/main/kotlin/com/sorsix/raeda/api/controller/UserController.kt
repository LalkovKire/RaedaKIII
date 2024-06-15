package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.UserRequest
import com.sorsix.raeda.service.UserService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {

    @PostMapping
    fun create(@RequestBody @Validated userRequest: UserRequest) =
        this.userService.createUser(userRequest)

    @GetMapping
    fun listAll() =
        this.userService.findAllUsers()

    @GetMapping("/{id}")
    fun findUserById(@PathVariable id: Long) =
        this.userService.findUserById(id)

    @DeleteMapping("/{id}")
    fun deleteUserById(@PathVariable id: Long) =
        this.userService.deleteUserById(id)

    @GetMapping("/rentals/{id}")
    fun getUserRentalsById(@PathVariable id: Long) =
        this.userService.getUserRentalsById(id)

    @GetMapping("/rentals")
    fun getUserRentalsByEmail(@RequestParam email: String) =
        this.userService.getUserRentalsByEmail(email)
}