import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {BrowserStorageService} from "../services/browserStorage.service";

export const canLoadGuard: CanActivateFn = (route, state) => {
  const browserStorageService = inject(BrowserStorageService);
  const router = inject(Router);

  if (browserStorageService.getUser() !== null)
    return true;

  return router.createUrlTree(['/']);
};
