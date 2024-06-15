import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { DashCardComponent } from './dash-card/dash-card.component';
import { DashObject } from './dash-service-object';
import {NavbarComponent} from "../pages/landing-page/navbar/navbar.component";

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [RouterLink,NavbarComponent,FooterComponent,DashCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  serviceList: DashObject[] = []

  constructor(){
  }

  ngOnInit(): void {
    this.serviceList = [
      {imageUrl: "../../assets/images/dashboard/car-dashboard.png", name: "Cars", routeLink: "/dashboard/cars"},
      {imageUrl: "../../assets/images/dashboard/location-dashboard.png", name: "Locations", routeLink: "/dashboard/locations"},
      {imageUrl: "../../assets/images/dashboard/rental-dashboard.png", name: "Rentals", routeLink: "/dashboard/rentals"}
    ]
  }


}
