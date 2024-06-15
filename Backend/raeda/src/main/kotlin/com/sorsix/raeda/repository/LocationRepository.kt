package com.sorsix.raeda.repository

import com.sorsix.raeda.domain.Location
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface LocationRepository : JpaRepository<Location, Long>, PagingAndSortingRepository<Location, Long> {

    fun existsByLocationAddressAndLocationName(address: String,name: String) : Boolean

}