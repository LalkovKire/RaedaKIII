package com.sorsix.raeda.domain

import com.sorsix.raeda.domain.enumerations.Role
import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "caruser")
data class User(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    val userId: Long,

    @Column(name = "firstname", nullable = false)
    val firstName: String,

    @Column(name = "lastname", nullable = false)
    val lastName: String,

    @Column(nullable = false)
    val email: String,

    @Column(name = "phonenumber", nullable = false)
    val phoneNumber: String,

    @Column(name="userpassword",nullable = false)
    val userPassword: String,

    @Column(name = "userrole", nullable = false)
    val role: Role,

    @OneToMany(mappedBy = "user")
    val rentals: List<Rental>
) : UserDetails  {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority("ROLE_${role.name}"))
    }

    override fun getPassword(): String = userPassword

    override fun getUsername(): String = this.email

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = true


}