import {Component, effect, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AvatarComponent} from "../../../components/avatar/avatar.component";
import {BrowserStorageService} from "../../../services/browserStorage.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AvatarComponent, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private browserStorageService = inject(BrowserStorageService);
  signedIn: User | null = null;

  constructor() {
    effect(() => {
      if (this.browserStorageService.isSignIn())
        this.signedIn = this.browserStorageService.getUser();

    });
  }
}
