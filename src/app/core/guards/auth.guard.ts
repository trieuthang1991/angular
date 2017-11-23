import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SystemConstants } from '../../core/Common/system.constant';
import { UrlConstants } from '../../core/Common/url.constant';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {

    }
    canActivate(activateRoute: ActivatedRouteSnapshot, routerstate: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConstants.Current_User)) {
            return true;
        }
        else {
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: routerstate.url
                }
            });
            return false;
        }
    }
}