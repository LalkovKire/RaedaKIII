import { Component, Input } from '@angular/core';
import {CarCardComponent} from "../../../../components/car-card/car-card.component";
import {CarModel} from "../../../../models/car.model";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CarCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  @Input() cars: CarModel[] = [];
}
