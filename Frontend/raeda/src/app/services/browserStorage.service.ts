import {Injectable, inject, signal} from '@angular/core';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class BrowserStorageService {
  router = inject(Router);

  isSignIn = signal(false);
  authenticated = signal(false);

  autoSignIn() {
    const localStorageUser = localStorage.getItem('user') as string;
    const sessionStorageUser = sessionStorage.getItem('user') as string;

    if (localStorageUser || sessionStorageUser) {
      const user = localStorageUser
        ? JSON.parse(localStorageUser)
        : JSON.parse(sessionStorageUser);
      this.isSignIn.set(true);
      if (user.role === 'ADMIN') this.authenticated.update((val) => true);
      else this.authenticated.update((val) => false);
    } else {
      this.isSignIn.set(false);
      this.authenticated.update((val) => false);
    }
  }

  saveUserInfoInStorage(whereToSave: boolean, userInfo: User) {
    const user = JSON.stringify(userInfo);

    if (whereToSave) {
      localStorage.setItem('user', user);
    } else {
      sessionStorage.setItem('user', user);
    }

    this.isSignIn.set(true);
  }

  userAuthentication(user: User): void {
    if (user.role === 'ADMIN') this.authenticated.update((val) => true);
    else this.authenticated.update((val) => false);
  }

  signOut() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this.authenticated.update((val) => false);
    this.isSignIn.set(false);
    this.router.navigateByUrl('/signin');
  }

  getUser(): User | null {
    const localStorageUser = localStorage.getItem('user') as string;
    const sessionStorageUser = sessionStorage.getItem('user') as string;

    if (localStorageUser) return JSON.parse(localStorageUser);

    if (sessionStorageUser) return JSON.parse(sessionStorageUser);

    return null;
  }
}
