import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Constant } from 'src/app/share/Constants/Constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleChat: boolean = true;
  toggleSingle: boolean = true;
  defaultLightMode: boolean = true;
  @Output() newEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  togglechatbar() {
    this.toggleChat = !this.toggleChat;
  }
  singleChatWindow() {
    this.toggleSingle = !this.toggleSingle;
  }
  toggle(event: any) {
    console.log(event);
  }
  setTheme(value: string) {
    this.newEvent.emit(value);
  }
  logout() {
    console.log(location.origin);
    this.router.navigateByUrl('/page-login');
    localStorage.removeItem(Constant.TOKEN);
    localStorage.removeItem('user');
  }
  toggleTheme() {
    this.defaultLightMode = !this.defaultLightMode; 
    let bodyElm = document.getElementsByTagName('body');
    // let logo = document.getElementsByClassName('brand-title');
    let logo = document.querySelector('img');
    if(this.defaultLightMode) {
      bodyElm[0].setAttribute('data-theme-version', 'transperent');
      bodyElm[0].setAttribute('data-primary', 'color_6');
      logo.src = '../../../assets/images/scrum-logo6.png'
    } else {
      bodyElm[0].setAttribute('data-theme-version', 'dark');
      bodyElm[0].setAttribute('data-primary', 'color_1');
      logo.src = '../../../assets/images/scrum-logo1.png'
      console.log(logo)
    }
  }
  manageAccount() {
    this.router.navigateByUrl('/manage-user');
  }
}
