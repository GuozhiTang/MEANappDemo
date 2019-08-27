import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
  ) {}

  /**
   * Logic of routes here
   * Some components can only be accessed after successfully login
   */
  canActivate() {
    if (this.authService.isTokenExp()) {
      // Re-direct our route
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}