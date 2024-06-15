import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashRental } from '../dash-service-object';
import { RentalService } from '../../services/rental.service';
import { MessageService } from 'primeng/api';
import {NavbarComponent} from "../../pages/landing-page/navbar/navbar.component";

@Component({
  selector: 'app-dash-rental-section',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './dash-rental-section.component.html',
  styleUrl: './dash-rental-section.component.css'
})
export class DashRentalSectionComponent implements OnInit {

  rentals!: DashRental[]

  constructor(
    private rentalService: RentalService,
    private messageService: MessageService
  ){
  }

  ngOnInit(): void {
    this.initRentals();
  }

  initRentals() {
    this.rentalService.getAllRentals()
      .subscribe({
        next: (rental) => {
          this.rentals = rental
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.description
          })
        }
      })
  }

  deleteRentalById(id: number){

  }
}
