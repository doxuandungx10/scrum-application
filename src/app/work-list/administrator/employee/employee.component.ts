import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/share-service/notification.service';
import { UserService } from 'src/app/services/user.service';
import { Constant } from 'src/app/share/Constants/Constant';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  dataSet: any;
  isVisibleAdd: boolean = false;
  listUser: any;
  userForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
  ) { 
    this.userForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      position: [null, [Validators.required]],
      isAdmin: [false]
    })
  }

  ngOnInit(): void {
    this.getListUser();
  }
  get f() { return this.userForm.controls }
  showAddUser(){
    this.isVisibleAdd = true;
  }
  closeModal(){
    this.isVisibleAdd = false;
    this.getListUser();
  }
  getListUser(){
    this.userService.getListUser().subscribe(res => {
      this.listUser = res;
    })
  }
  handleOk() {
    this.submitted = true;
    if (this.userForm.valid) {
      let form = this.userForm.value;
      let payload = {
        fullName: form.fullName,
        email: form.email,
        position: form.position,
        isAdmin: form.isAdmin
      }
      this.userService.createAccount(payload).subscribe(res => {
        if (res.isValid) {
          this.submitted = false;
          this.userForm.reset();
          this.isVisibleAdd = false;
          this.notificationService.showNotification(Constant.SUCCESS, 'Tạo tài khoản thành công');
        }
        else{
          this.notificationService.showNotification(Constant.ERROR, 'Có lỗi xảy ra');
        }
      })
    }
  }
  handleCancel() {
    this.isVisibleAdd = false;
    this.userForm.reset();
  }
}
