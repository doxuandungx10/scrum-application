import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

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
  }
  toggleTheme() {
    this.defaultLightMode = !this.defaultLightMode; 
    let bodyElm = document.getElementsByTagName('body');
    if(this.defaultLightMode) {
      bodyElm[0].setAttribute('data-theme-version', 'transperent');
      bodyElm[0].setAttribute('data-primary', 'color_6');
    } else {
      bodyElm[0].setAttribute('data-theme-version', 'dark');
      bodyElm[0].setAttribute('data-primary', 'color_1');
    }
    console.log(this.defaultLightMode);
  }
}
