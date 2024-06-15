import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserStorageService } from './services/browserStorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig);
  private browserStorageService = inject(BrowserStorageService);

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation({
      firstDayOfWeek: 1,
      dateFormat: 'dd.mm.yy',
    });
    this.browserStorageService.autoSignIn();
  }
}
