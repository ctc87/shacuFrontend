import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private login: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Admin " + this.login.its_admin)
        if (this.login.its_admin) {
            return true;
        }
        this.router.navigate(['/profile']);
        return false;
    }
}