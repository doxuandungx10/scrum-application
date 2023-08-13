import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import { ShareService } from 'src/app/services/share.service';
import { UserService } from 'src/app/services/user.service';
import { Constant } from 'src/app/share/Constants/Constant';
import { removeAccents } from 'src/app/share/utils/remove-accents';

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
  userOnline: any;
  listProject: any[] = [];
  filteredLstProject: any[] = [];
  textSearch = '';
  isShowSearch: boolean = false;
  currentProject: any;
  projectId: any;
  user: any


  constructor(private router: Router,
    private projectService: ProjectService,
    private routerActivate: ActivatedRoute,
    private userService: UserService,
    private shareService: ShareService
    ) {}

  ngOnInit() {
    this.routerActivate.parent?.params.subscribe((parameter) => {
      this.projectId = parameter.id;
    });
    this.userOnline = JSON.parse(localStorage.getItem('user')!);
    setTimeout(() => {
      this.getProjectById();
    }, 500);
    this.getListProjectByUser();
    this.getUserInfo();
  }

  getProjectById() {
    console.log(this.projectId);

    this.projectService.getProjectById(this.projectId).subscribe((res) => {
      this.textSearch = res.name;
    });
  }

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
    }
  }
  manageAccount() {
    this.router.navigateByUrl('/manage-user');
  }
  getListProjectByUser() {
    this.projectService.getListProject(this.userOnline.id).subscribe((res) => {
      this.listProject = res;
      // this.filteredLstProject = this.listProject;
    });
  }
  onSearch() {
    const keyword = removeAccents(this.textSearch.trim().toLowerCase());
    this.filteredLstProject = this.listProject.filter((en) =>
      removeAccents(en.name?.toString().trim()).toLowerCase().includes(keyword)
    );

  }
  focusFunction() {
    this.isShowSearch = true;
  }
  focusOutFunction() {
    setTimeout(() => {
      this.isShowSearch = false;
    }, 400);
  }
  onSelectProject(data) {
    this.currentProject = data;
    this.textSearch = data.name
    location.href = location.origin + `/general-info/${data.id}`
  }

  getUserInfo() {
    let id = JSON.parse(localStorage.getItem("user")!).id;
    this.userService.getUserById(id).subscribe(res => {
      this.user = res;
    })
  }

  convertPosition(pos: number){
    return this.shareService.convertPosition(pos);
  }
}
