import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
  ) {}

  // Here we put our logic of routes
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