import { Component, Input, OnInit } from '@angular/core';
import { DashObject } from '../dash-service-object';

@Component({
  selector: 'app-dash-card',
  standalone: true,
  imports: [],
  templateUrl: './dash-card.component.html',
  styleUrl: './dash-card.component.css'
})
export class DashCardComponent implements OnInit {

  @Input()
  item: DashObject | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
