import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { CarLocation } from '../../dash-service-object';
import { LocationService } from '../../../services/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-paginator.component.html',
  styleUrl: './location-paginator.component.css'
})
export class LocationPaginatorComponent implements OnInit {

  currentPage = 0;
  pageSize = 15;
  totalPages = 0;
  pages: number[] = [];
  @Output() locationChanged: EventEmitter<CarLocation[]> =
   new EventEmitter<CarLocation[]>();
  queryParamsSubscription : Subscription | undefined;

  constructor(
    private service: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.route.queryParams
    .pipe(
      switchMap((params) => {
        if (this.queryParamsSubscription !== undefined) this.queryParamsSubscription.unsubscribe();
        return this.service.getAllLocationsByPagination(params, this.currentPage, this.pageSize)
      })
    ).subscribe({
        next: (location) => {
          this.totalPages = location.totalPages;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.locationChanged.emit(location.content);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page - 1;
      this.loadLocations();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadLocations();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadLocations();
    }
  }
}
