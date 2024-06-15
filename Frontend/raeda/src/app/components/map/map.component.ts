import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { CarLocation } from '../../dashboard/dash-service-object';
import { MessageService } from 'primeng/api';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import markerIconShadow from "leaflet/dist/images/marker-shadow.png"
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  map: any;
  loc: CarLocation[] = []

  constructor(
    private locationService: LocationService,
    private messageService: MessageService
  ){}

  ngAfterViewInit(): void {
    this.initLocations();
  }

  initLocations(){
    this.locationService.getAllLocations()
    .subscribe({
      next: (l) => {
        this.loc = l;
        this.initMap();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description
        })
      }
    })
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [41.6781,21.9974],
      zoom: 9
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var myIcon = L.icon({
      iconUrl: markerIconPng,
      iconSize: [22, 33],
      shadowSize: [55, 33],
      shadowUrl: markerIconShadow,
   });

    for(let i=0;i<this.loc.length;i++) {
      const tmp = this.loc[i].locationAddress.split("/")
      let marker = L.marker([parseFloat(tmp[0]),parseFloat(tmp[1])],{icon: myIcon});
      marker.addTo(this.map).bindPopup(this.loc[i].locationName).openPopup()
    }

    tiles.addTo(this.map);
  }
}
