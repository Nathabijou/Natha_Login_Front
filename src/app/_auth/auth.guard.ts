import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.userAuthService.getToken();
    const requiredRoles = route.data['roles'] as Array<string>;

    if (token) {
      if (requiredRoles) {
        const roleMatch = this.userService.roleMatch(requiredRoles);

        if (roleMatch) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
      return true; // Allow access if no roles are required
    }

    this.router.navigate(['/login']);
    return false;
  }
}
