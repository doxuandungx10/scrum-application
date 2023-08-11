import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  step: number = 1;
  email: string = "";
  errorMessage: string = "";
  formChangePassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  sendEmail() {
    if (this.email.trim() == "") {
      this.errorMessage = "Email không được để trống!";
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.errorMessage = "Email không hợp lệ!";
      return;
    }
    this.userService.sendEmailToChangePass(this.email).subscribe(res=>{
      if(res.isValid){
        this.step = 2;
      }
      else{
        this.errorMessage = res.errorMessage; 
      }
    })
  }

  redirectLogin(){
    this.router.navigate(['/page-login'])
  }
}
