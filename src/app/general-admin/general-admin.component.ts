import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { ProjectService } from 'src/app/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../services/share-service/notification.service';
import { Constant } from '../share/Constants/Constant';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-general-admin',
  templateUrl: './general-admin.component.html',
  styleUrls: ['./general-admin.component.css'],
})
export class GeneralAdminComponent implements OnInit {
  title = 'kripton';
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;
  listProject: any[] = [];
  isVisibleAddProj: boolean = false;
  userOnline: any;
  projectForm: FormGroup;
  isVisible: boolean = false;
  listAllUserSystem: any[] = [];

  constructor(
    public sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      creatorId: [null],
    });
  }

  async ngOnInit() {
    await (this.userOnline = JSON.parse(localStorage.getItem('user')!));
    this.getListProjectByUser();
  }

  getListUser() {
    this.userService.getListUser().subscribe((res) => {
      this.listAllUserSystem = res;
    });
  }

  navigate() {
    this.router.navigateByUrl('admin');
  }

  getListProjectByUser() {
    this.projectService.getListProject(this.userOnline.id).subscribe((res) => {
      this.listProject = res;
    });
  }

  addProject() {
    this.isVisibleAddProj = true;
  }

  closeModalAdd() {
    this.isVisibleAddProj = false;
  }

  refreshData() {
    this.isVisibleAddProj = false;
    this.getListProjectByUser();
  }

  handleOk() {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (this.projectForm.valid) {
      let payload = {
        name: this.projectForm.value.name,
        description: this.projectForm.value.description,
        creatorId: user.id,
      };
      console.log('payload', payload);
      this.projectService.addProject(payload).subscribe((res) => {
        this.isVisibleAddProj = false;
        this.getListProjectByUser();
        this.notificationService.showNotification(
          Constant.SUCCESS,
          Constant.MESSAGE_ADD_SUCCESS
        );
      });
    }
  }
  handleCancel() {
    this.isVisibleAddProj = false;
  }
}
