package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.LocationRequest
import com.sorsix.raeda.api.response.LocationResponse
import com.sorsix.raeda.domain.Location
import com.sorsix.raeda.repository.LocationRepository
import com.sorsix.raeda.service.exceptions.LocationAddressAlreadyRegisteredException
import com.sorsix.raeda.service.exceptions.LocationNotFoundException
import com.sorsix.raeda.api.util.toLocationResponse
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class LocationService(private val locationRepository: LocationRepository) {

    fun getAllLocations() =
        this.locationRepository.findAll().map {
            it.toLocationResponse()
        }

    fun getAllLocationsByPage(pageable: Pageable) =
        this.locationRepository.findAll(pageable).map {
            it.toLocationResponse()
        }

    fun getLocationById(id: Long) : Location {
        return this.locationRepository.findByIdOrNull(id) ?:
                throw LocationNotFoundException(id)
    }

    fun deleteLocation(id: Long) : LocationResponse {
        val tmp = this.getLocationById(id)
        this.locationRepository.deleteById(id)
        return tmp.toLocationResponse()
    }

    fun saveNewLocation(newLocation: LocationRequest) : LocationResponse {

        if (this.locationRepository.existsByLocationAddressAndLocationName(
                newLocation.locationAddress,newLocation.locationName))
            throw LocationAddressAlreadyRegisteredException(newLocation.locationAddress)

        return this.locationRepository.save(
            Location(
                locId = 0L,
                locationAddress = newLocation.locationAddress,
                locationName = newLocation.locationName
            )).toLocationResponse()
    }

    fun editLocation(id: Long, location: LocationRequest): LocationResponse {
        val fetchLocation = this.getLocationById(id)

        if (this.locationRepository.existsByLocationAddressAndLocationName(
                location.locationAddress,location.locationName))
            throw LocationAddressAlreadyRegisteredException(location.locationAddress)

        fetchLocation.apply {
            this.locationName = location.locationName
            this.locationAddress = location.locationAddress
        }

        return this.locationRepository.save(fetchLocation).toLocationResponse()
    }

}