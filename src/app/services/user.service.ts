import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { User } from '../share/class/user.class';
import { UrlConstant } from '../share/Constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ConfigService {
  // userLogin = new BehaviorSubject<User>({
  //   id: 0,
  //   fullName: "",
  //   username: "",
  //   email: "",
  //   role: 0,
  //   position: 0,
  // });
  private userAvatar = new BehaviorSubject('');
  userAvatar$ = this.userAvatar.asObservable();
  changeUserAvatarLocal(userAvatar: string) {
    this.userAvatar.next(userAvatar);
  }

  getUserInfo() {
    //return this.userLogin.getValue();
  }

  getUserById(id: number): Observable<any> {
    return this.get(UrlConstant.USER + '/GetUserById', { id })
  }

  updateUserInfo(payload: any): Observable<any> {
    return this.post(UrlConstant.USER + '/UpdateUserInfo', payload);
  }

  updateUserRole(payload: any): Observable<any> {
    return this.post(UrlConstant.USER + '/UpdateUserRole', payload);
  }

  updatePassword(payload: any): Observable<any> {
    return this.post(UrlConstant.USER + '/UpdatePassword', payload);
  }

  getListUser(): Observable<any> {
    return this.get(UrlConstant.USER + '/GetListUser', "")
  }

  createAccount(payload: any): Observable<any> {
    return this.post(UrlConstant.USER + '/CreateAccount', payload);
  }

  getListUserByProjectId(projectId: number): Observable<any> {
    return this.get(UrlConstant.USER + '/GetListUserByProjectId', { projectId })
  }

  getUserInfoById(id: string) {
    return this.get(UrlConstant.USER + '/GetUserInfoById', id);
  }

  sendEmailToChangePass(email: string): Observable<any> {
    return this.post(UrlConstant.USER + '/SendEmailToChangePass', "", { email });
  }

  // addMemberToProject(listId: any, projectId: number): Observable<any> {
  //   return this.post(UrlConstant.USER + '/AddMemberToProject', listId, { projectId });
  // }

  addMemberToProject(payload: any): Observable<any> {
    return this.post(UrlConstant.USER + '/AddMemberToProject', payload);
  }

  getTimeOfUserBySprintId(sprintId: number, projectId: number): Observable<any> {
    return this.get(UrlConstant.USER + '/GetTimeOfUserBySprintId', { sprintId, projectId })
  }

  changeAvatar(payload: any): Observable<any>{
    return this.post(UrlConstant.USER + '/ChangeAvatar', payload);
  }

  removeMemberFromProject(id: any): Observable<any> {
    return this.delete(UrlConstant.USER + '/RemoveMember/' + id, null);
  }
}
