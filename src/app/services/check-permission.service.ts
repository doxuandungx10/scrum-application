import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CheckPermissionService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log("ute.data.roles", route.data.roles);
    if (this.checkPermission(route.data.roles)) {
      return true;
    }
    this.router.navigate(['homepage']);
    return false;
  }

  checkPermission(role: string[]) {
    let user = JSON.parse(localStorage.getItem("user")!);
    console.log("checkPermission", user.roles);
    return role.some(u => user.roles.indexOf(u) >= 0);
  }
}
