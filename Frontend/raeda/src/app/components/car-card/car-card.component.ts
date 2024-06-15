import {Component, inject, Input, OnInit} from '@angular/core';
import {CarModel} from '../../models/car.model';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'car-card',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent implements OnInit {
  @Input() car: CarModel | undefined;
  router = inject(Router);
  path = './';

  ngOnInit(): void {
    if (!this.router.url.includes('cars')) this.path = 'cars';
  }
}
