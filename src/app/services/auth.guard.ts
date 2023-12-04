import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).loggedInGuard) {
    return true;
  } else {
    new Router().navigate(['/login']);
    return false;
  }
};
