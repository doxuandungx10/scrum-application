import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { Constant } from 'src/app/share/Constants/Constant';

@Component({
  selector: 'app-account-role',
  templateUrl: './account-role.component.html',
  styleUrls: ['./account-role.component.scss']
})
export class AccountRoleComponent implements OnInit {
  listUser: any;
  allRoles: any;
  pageSize: number[] = [10, 20, 30, 40];
  defaultPage: number = 10;
  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.getListRole();
    this.getListUser();
  }

  getListRole() {
    this.allRoles = Object.keys(Constant.ROLES)
      .map(key => {
        return {
          "name": key,
          "value": Constant.ROLES[key]
        }
      });
  }
  saveUserRole(user:any) {
    let payload = {
      id: user.id,
      roles: user.roles
    }
    this.userService.updateUserRole(payload).subscribe(res => {
      this.notification.success('Thông báo', 'Cập nhật thành công!<br>Đăng nhập lại để có hiệu lực!');
    }, error => {
      this.notification.error('Thông báo', 'Có lỗi xảy ra!');
    })
  }
  updateUserRole(user:any, value:number, status:number) {
    if (status === 0) {
      user.roles = user.roles.filter((item:number) => item !== value);
    } else {
      if (!user.roles.includes(value)) {
        user.roles.push(value);
      }
    }
  }

  getListUser() {
    this.userService.getListUser().subscribe(res=>{
      this.listUser = res;
    }, error => {
      this.notification.error('Thông báo', 'Có lỗi xảy ra!');
    });
  }

  getRowIndex(index: number, pageIndex: number, pageSize: number) {
    return index + 1 + pageSize * (pageIndex - 1);
  }

  checkRole(role:number, user:any) {
    return user.roles.includes(role);;
  }

  saveAccountRole() {}
}
