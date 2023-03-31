import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        //private state: RouterStateSnapshot
    ) { }

    canActivate() {
        let login = false;
        this.authService.isUserLogin().subscribe(res=>{
            login = res;
            console.log("res", res);
        })
        if (login) {
            return true;
        }
        this.router.navigate(['page-login']);
        return false;
    }
}
