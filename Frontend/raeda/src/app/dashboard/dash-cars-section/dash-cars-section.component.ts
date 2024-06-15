import {Component, inject, OnInit} from '@angular/core';
import {FooterComponent} from '../../components/footer/footer.component';
import {CommonModule} from '@angular/common';
import {FilterSidebarComponent} from '../../components/filter-sidebar/filter-sidebar.component';
import {CarService} from '../../services/car.service';
import {CarModel} from '../../models/car.model';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
import {RouterLink} from '@angular/router';
import {FilterService} from "../../services/filter.service";
import {NavbarComponent} from "../../pages/landing-page/navbar/navbar.component";

@Component({
  selector: 'app-dash-cars-section',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    CommonModule,
    FilterSidebarComponent,
    PaginatorComponent,
    RouterLink
  ],
  templateUrl: './dash-cars-section.component.html',
  styleUrl: './dash-cars-section.component.css',
})
export class DashCarsSectionComponent implements OnInit {
  private filterService = inject(FilterService);

  cars: CarModel[] = [];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
  }

  deleteCarEntry(id: number): void {
    this.carService.deleteCarById(id).subscribe({
      next: (succ) => {
        let ind = this.cars.map(e => e.licensePlate).indexOf(succ.licensePlate);
        this.cars.splice(ind, 1);
      },
      error: (err) => console.log(err),
    });
  }

  onToggleFilterBy() {
    this.filterService.toggle.set(true);
  }

  onCarsChanged(cars: CarModel[]): void {
    this.cars = cars;
  }
}
