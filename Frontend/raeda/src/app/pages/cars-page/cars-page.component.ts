import {Component, effect, inject} from '@angular/core';
import {NavbarComponent} from '../landing-page/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {CarService} from '../../services/car.service';
import {CarModel} from '../../models/car.model';
import {CarCardComponent} from '../../components/car-card/car-card.component';
import {LoadingComponent} from '../../components/loading/loading.component';
import {ErrorComponent} from '../../components/error/error.component';
import {FilterSidebarComponent} from '../../components/filter-sidebar/filter-sidebar.component';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
import {WarningComponent} from '../../components/warning/warning.component';
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-cars-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CarCardComponent,
    LoadingComponent,
    ErrorComponent,
    WarningComponent,
    FilterSidebarComponent,
    PaginatorComponent,
  ],
  templateUrl: './cars-page.component.html',
  styleUrl: './cars-page.component.css',
})
export class CarsPageComponent {
  private carService = inject(CarService);
  private filterService = inject(FilterService);


  cars: CarModel[] = [];
  isLoading = false;
  error = false;
  warning = false;

  constructor() {
    effect(() => {
      this.isLoading = this.carService.isLoading();
      this.error = this.carService.error();
    });
  }

  onToggleFilterBy() {
    this.filterService.toggle.set(true);
  }

  onCarsChanged(cars: CarModel[]): void {
    this.warning = false;
    this.cars = cars;

    if (cars.length === 0) this.warning = true;
  }
}
