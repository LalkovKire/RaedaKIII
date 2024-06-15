import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location.service';
import { CarLocation } from '../dash-service-object';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { LocationPaginatorComponent } from './location-paginator/location-paginator.component';
import {NavbarComponent} from "../../pages/landing-page/navbar/navbar.component";

@Component({
  selector: 'app-dash-location-section',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterLink,
    FooterComponent,
    LocationPaginatorComponent],
  templateUrl: './dash-location-section.component.html',
  styleUrl: './dash-location-section.component.css'
})
export class DashLocationSectionComponent implements OnInit {

  locations: CarLocation[] = [];

  constructor(
    private locationService: LocationService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {}

  onLocationsChanged(loc: CarLocation[]): void {
    this.locations = loc;
  }

  deleteLocationById(id: number): void {
    this.locationService.deleteLocationById(id)
      .subscribe({
        next: (loc) => {
          const index = this.locations.map(l => l.locationId).indexOf(loc.locationId);
          this.locations.splice(index,1);
          this.messageService.add({
            severity: 'success',
            detail: 'Location deleted successfuly'
          })
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            detail: 'The location is associated with other Cars and Rentals.'
          })
        }
      })
  }
}
