import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { UrlConstant } from '../share/Constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ConfigService {
  isloggedInSub = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  isloggedIn: Observable<any> = this.isloggedInSub.asObservable();
  oldPassword: string = "";

  login(payload: any): Observable<any> {
    return this.post(UrlConstant.LOGIN, payload, "");
  }

  isUserLogin() {
    let token = localStorage.getItem("jwt");
    console.log("isloggedIn", token)
    if(token == null){
      this.isloggedInSub.next(false);
    }
    else this.isloggedInSub.next(true);
    
    console.log("isloggedIn", this.isloggedIn)
    return this.isloggedIn;
  }

  isAuthenticate(){
    let user = JSON.parse(localStorage.getItem("user")!);
    if(user == null){
      return false;
    }
    return true;
  }

  checkToken(){
    //return this.post(UrlConstant.LOGIN)
  }

  activateAccount(payload: any): Observable<any> {
    return this.post(UrlConstant.LOGIN + '/ActivateAccount', payload, "");
  }

  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
  }
}
