import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth.service.service';
import { AuthStatusService } from '../shared/services/auth-status.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authStatusService: AuthStatusService,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userType = decodedToken.type;
        if (userType) {
          this.authStatusService.setCurrentUser(decodedToken);
          return true;
        }
      } catch (e) {
        console.error('Invalid token:', e);
      }
    }

    this.authStatusService.clearCurrentUser();
    this.router.navigate(['/login']);
    return false;
  }
}
