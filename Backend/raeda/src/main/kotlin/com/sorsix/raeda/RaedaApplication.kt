package com.sorsix.raeda

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class RaedaApplication

fun main(args: Array<String>) {
    runApplication<RaedaApplication>(*args)
}
