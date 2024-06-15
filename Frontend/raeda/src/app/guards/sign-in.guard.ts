import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {BrowserStorageService} from '../services/browserStorage.service';

export const signInGuard: CanActivateFn = (route, state) => {
  const browserStorageService = inject(BrowserStorageService);
  const router = inject(Router);

  if (browserStorageService.getUser() !== null)
    return router.createUrlTree(['/']);

  return true;
};
