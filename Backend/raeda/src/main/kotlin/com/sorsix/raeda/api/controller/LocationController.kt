package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.LocationRequest
import com.sorsix.raeda.api.util.toLocationResponse
import com.sorsix.raeda.service.LocationService
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/loc")
class LocationController(private val locationService: LocationService){

    @GetMapping
    fun getAllLocation() =
        this.locationService.getAllLocations()

    @GetMapping("/page")
    fun getAllLocationWithPageable
                (@RequestParam page: String,
                 @RequestParam size: String) =
        this.locationService.getAllLocationsByPage(
            PageRequest.of(page.toIntOrNull()?:0,
                size.toIntOrNull()?:15,
                Sort.by(Sort.Direction.ASC, "locId")
            )
        )

    @GetMapping("/{id}")
    fun getLocationById(@PathVariable id: Long) =
        this.locationService.getLocationById(id).toLocationResponse()

    @PostMapping
    fun saveNewLocation(@RequestBody loc: LocationRequest) =
        this.locationService.saveNewLocation(loc)

    @PutMapping("/edit/{id}")
    fun editLocation(@PathVariable id: Long, @RequestBody @Validated loc: LocationRequest) =
        this.locationService.editLocation(id,loc)

    @DeleteMapping("/{id}")
    fun deleteLocation(@PathVariable id: Long) =
        this.locationService.deleteLocation(id)

}