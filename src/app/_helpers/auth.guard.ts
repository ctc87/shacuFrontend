import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class  AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private login: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Authguard 3" + this.login.logged)

        if (this.login.logged) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login']);
        return false;
    }
}