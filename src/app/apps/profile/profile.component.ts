import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/share/class/user.class';
import { ShareService } from 'src/app/services/share.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/share-service/notification.service';
import { Constant } from 'src/app/share/Constants/Constant';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accountForm: FormGroup;
  changePassForm: FormGroup;
  loading: boolean = false;
  changePass: boolean = false;
  avatarUrl?: string;
  user: any = {};
  // model!: NgbDateStruct;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private userService: UserService,
    private shareService: ShareService,
    private notificationService: NotificationService,
    ) {
    this.accountForm = this.fb.group({
      username: [null],
      fullName: [null],
      email: [null],
      gender: [null],
      dob: [null],
      position: [null],
    })
    this.changePassForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      repeatPass: [null, [Validators.required]]
    })
    }

  ngOnInit(): void {
    this.getUserInfo();

  }

	open(modelId:any) {
		this.modalService.open(modelId);
	}

  get f() { return this.accountForm.controls }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        //this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        //this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        //this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
  updatePassword() {
    let form = this.changePassForm.value;
    let payload = {
      email: this.user.email,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      repeatPass: form.repeatPass
    }
    this.userService.updatePassword(payload).subscribe(res=>{

    })

  }

  getUserInfo() {
    let id = JSON.parse(localStorage.getItem("user")!).id;
    this.userService.getUserById(id).subscribe(res => {
      this.user = res;
      this.accountForm.patchValue({
        username: res.username,
        fullName: res.fullName,
        email: res.email,
        gender: res.gender,
        dob: res.dob,
        position: this.user.position,
      })
      console.log("accountForm", this.accountForm.value);
    })
  }

  updateUserInfo() {
    let form = this.accountForm.value;
    let payload = {
      id: this.user.id,
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      role: form.role,
      position: form.position,
      dob: form.dob,
      gender: form.gender,
    }
    this.userService.updateUserInfo(payload).subscribe(res => {
      this.getUserInfo();
      this.notificationService.showNotification(
            Constant.SUCCESS,
            'Cập nhật thông tin thành công'
          );
    })
  }

  convertPosition(pos: number){
    return this.shareService.convertPosition(pos);
  }

}
