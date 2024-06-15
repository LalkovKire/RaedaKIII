import { Component, Input } from '@angular/core';

@Component({
  selector: 'brand-card',
  standalone: true,
  imports: [],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css',
})
export class BrandCardComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
}
