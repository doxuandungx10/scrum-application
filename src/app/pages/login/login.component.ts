import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constant } from 'src/app/share/Constants/Constant';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  showPassword: boolean = false;
  incorrect: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]], //, [Validators.pattern("/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;")]],
      password: [null, [Validators.required]], //, [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  redirectToHome() {
    this.router.navigate(['/general-admin']);
  }

  login() {
    this.submitted = true;
    let form = this.loginForm;
    if (form.valid) {
      let payload = {
        username: form.value.username,
        password: form.value.password,
      };
      this.authService.login(payload).subscribe((res) => {
        if (res.isValid) {
          console.log('login', res);
          localStorage.setItem(Constant.TOKEN, res.token);
          localStorage.setItem('user', res.user);
          this.router.navigate(['general-admin']);
          this.authService.isAdmin.next(res.user.isAdmin);
          this.authService.isloggedInSub.next(true);
        } else {
          //this.router.navigate(['login']);
          this.errorMessage = res.errorMessage;
        }
      });
    }
  }
}
