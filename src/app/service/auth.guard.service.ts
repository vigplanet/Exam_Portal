import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild,CanLoad {

  constructor(private router: Router, private cookieService: CookieService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    console.log('sadasdas',this.cookieService.get('X-Auth'))  ;  
    if (this.cookieService.get('X-Auth')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    window.location.assign("http://localhost:4200/auth/login");
    //login url
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
  canLoad() {
    console.log('sadasdas',this.cookieService.get('X-Auth'))  ;  
    if (this.cookieService.get('X-Auth')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    return false;
  }
}

