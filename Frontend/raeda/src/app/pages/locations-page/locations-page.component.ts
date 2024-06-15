import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../landing-page/navbar/navbar.component';
import {CommonModule} from '@angular/common';
import {MapComponent} from "../../components/map/map.component";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-locations-page',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    CommonModule,
    MapComponent
  ],
  templateUrl: './locations-page.component.html',
  styleUrl: './locations-page.component.css'
})
export class LocationsPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}
