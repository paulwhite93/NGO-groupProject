import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private auth: AuthenticationService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  | Observable <boolean | UrlTree >
  | Promise <boolean | UrlTree>
  | boolean
  | UrlTree {
  if (this.auth.isLoggedIn() 
  // && this.login.getUserRole() == 'Librarian'
  ) {
    return true;
  }
  this.router.navigate(['login']);
  return false;
}
}
