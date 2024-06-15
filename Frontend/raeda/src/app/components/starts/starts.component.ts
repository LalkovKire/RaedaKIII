import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-starts',
  standalone: true,
  imports: [],
  templateUrl: './starts.component.html',
  styleUrl: './starts.component.css'
})
export class StartsComponent {
  @Input() rating: number = 0;

  getStars(stars: number) {
    return Array(stars).fill(0).map(x => x);
  }

  getFillStars() {
    return this.getStars(this.rating);
  }

  getOutlineStart() {
    const diff = 5 - this.rating;

    return this.getStars(diff);
  }
}
