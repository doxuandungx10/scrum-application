import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor() {}

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
}
