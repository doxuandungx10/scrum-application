import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Backlog } from 'src/app/share/class/backlog.class';
import { BacklogService } from 'src/app/services/backlog.service';
import { SprintService } from 'src/app/services/sprint.service';
import { ShareService } from 'src/app/services/share.service';

import { Sprint } from 'src/app/share/class/sprint.class';
import { SprintBacklog } from 'src/app/share/class/sprintbacklog.class';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/share-service/notification.service';
import { Constant } from 'src/app/share/Constants/Constant';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  projectId: any;

  isVisibleModalBacklog: boolean = false;
  listBacklog: Backlog[] = [];
  backlogForm: FormGroup;
  isAdd: boolean = true;
  listSprint: any;
  listBacklogConvert: number[] = [];
  selectedSprint: Sprint = {
    id: 0,
    projectId: 0,
    name: '',
    timeStart: '',
    timeEnd: '',
    workingDay: 0,
  };
  initialSelectedSprint = this.selectedSprint;
  initialValue: any;
  isVisibleModalConvert: boolean = false;
  listConvert: SprintBacklog[] = [];

  listOfCurrentPageData: ReadonlyArray<Backlog> = [];
  setOfCheckedId = new Set<number>();
  allCheckedCurrentPage: boolean = false;

  listUser: any[] = [];

  constructor(
    private router: ActivatedRoute,
    private backlogService: BacklogService,
    private fb: FormBuilder,
    private sprintService: SprintService,
    private shareService: ShareService,
    private userService: UserService,
    private notificationService: NotificationService,
    private modalAntService: NzModalService
  ) {
    this.backlogForm = this.fb.group({
      id: [null],
      projectId: [null],
      userId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      performerName: [null],
      category: [null],
      status: [0],
      statusText: ['To Do'],
      module: [null],
      priority: 1,
    });
    this.initialValue = this.backlogForm.value;
  }

  ngOnInit(): void {
    this.router.parent?.params.subscribe((parameter) => {
      this.projectId = parameter.id;
    });
    this.getListBacklog();
    this.getListSprint();
    this.getListUser();
  }

  get f() {
    return this.backlogForm.controls;
  }

  getListUser() {
    this.userService.getListUserByProjectId(this.projectId).subscribe((res) => {
      this.listUser = res;
    });
  }
  getListBacklog() {
    this.backlogService
      .getListBacklogByProjectId(this.projectId)
      .subscribe((res) => {
        this.listBacklog = res;
        console.log('listBacklog', this.listBacklog);
      });
  }

  openModalAddBacklog() {
    this.isAdd = true;
    this.isVisibleModalBacklog = true;
    this.backlogForm.reset(this.initialValue);
  }
  handleCancel() {
    this.isVisibleModalBacklog = false;
  }
  openModalEdit(data: any) {
    this.isAdd = false;
    this.backlogForm.patchValue({
      id: data.id,
      projectId: this.projectId,
      userId: data.userId,
      priority: data.priority,
      name: data.name,
      description: data.description,
      status: data.status,
      statusText: data.statusText,
      category: data.category,
      module: data.module,
    });
    console.log('openModalEdit', data);
    this.isVisibleModalBacklog = true;
  }
  removeBacklogItem(id: number) {}
  addBacklog() {
    let form = this.backlogForm.value;
    let payload = {
      projectId: this.projectId,
      userId: form.userId,
      priority: parseInt(form.priority),
      name: form.name,
      description: form.description,
      status: form.status,
      category: 1, //form.category,
      module: form.module,
    };
    console.log('addBacklog', this.backlogForm.valid, form.valid, payload);
    //if (this.backlogForm.valid)
    {
      this.backlogService.addBacklog(payload).subscribe((res) => {
        this.notificationService.showNotification(
          Constant.SUCCESS,
          Constant.MESSAGE_ADD_SUCCESS
        );
        this.isVisibleModalBacklog = false;
        this.getListBacklog();
      });
    }
  }
  updateBacklog() {
    let form = this.backlogForm.value;
    if (this.backlogForm.valid) {
      let payload = {
        id: form.id,
        projectId: this.projectId,
        userId: form.userId,
        priority: form.priority,
        name: form.name,
        description: form.description,
        status: form.status,
        category: form.category,
        module: form.module,
      };
      console.log('huongntt payload', payload);
      this.backlogService.updateBacklog(payload).subscribe((res) => {
        this.notificationService.showNotification(
          Constant.SUCCESS,
          Constant.MESSAGE_UPDATE_SUCCESS
        );
        this.isVisibleModalBacklog = false;
        this.getListBacklog();
      });
    }
  }
  convertSprintBacklog() {
    console.log('---------listConvert', this.listConvert);
    let listBacklog = this.listBacklogConvert;
    this.backlogService
      .convertBacklog(this.selectedSprint.id, this.listConvert)
      .subscribe((res) => {
        if (res.ret[0].code == 400) {
          this.notificationService.showNotification(
            Constant.ERROR,
            res.ret[0].message
          );
        } else {
          this.isVisibleModalConvert = false;
          this.getListBacklog();
          this.undoSelected();
          this.notificationService.showNotification(
            Constant.SUCCESS,
            res.ret[0].message
          );
        }
      });
  }
  getListSprint() {
    this.sprintService.getListSprint(this.projectId).subscribe((res) => {
      this.listSprint = res;
      console.log('listSprint', this.listSprint);
    });
  }
  selectSprint(sprint: any) {
    this.selectedSprint = sprint;
  }
  changeChecked(checked: boolean, backlog: Backlog) {
    if (checked) {
      //this.listBacklogConvert.push(backlogId);
      var data: SprintBacklog = {
        id: 0,
        backlogId: backlog.id,
        backlogName: backlog.name,
        name: backlog.name,
        status: backlog.status,
        priority: backlog.priority,
        percentageRemain: backlog.percentageRemain,
        isTarget: false,
        totalTask: 0,
        doneTask: 0,
      };
      this.listConvert.push(data);
    } else {
      this.listConvert = this.listConvert.filter(
        (en) => en.backlogId != backlog.id
      );
    }
    console.log('listConvert', this.listConvert);
  }
  convertStatusText(status: number): string {
    return this.shareService.convertStatusText(status);
  }
  openConvertModal() {
    this.isVisibleModalConvert = true;
    console.log('listConvert', this.listConvert);
  }
  handleCancelConvert() {
    this.isVisibleModalConvert = false;
  }
  undoSelected() {
    this.selectedSprint = this.initialSelectedSprint;
    this.refreshCheckedStatus();
  }
  sendRequest() {}
  onCurrentPageDataChange(data: any) {
    this.listOfCurrentPageData = data;
  }
  onAllChecked(checked: boolean) {
    this.listOfCurrentPageData
      .filter((en) => en.percentageRemain > 0)
      .forEach((e) => {
        e.checked = checked;
        this.changeChecked(e.checked, e);
      });
  }
  refreshCheckedStatus() {
    this.listOfCurrentPageData
      .filter((en) => en.percentageRemain > 0)
      .forEach((e) => {
        e.checked = false;
      });
    this.allCheckedCurrentPage = false;
    this.listConvert = [];
  }

  log(data: any) {
    console.log(this.listUser);
    console.log(data);
  }

  showConfirm(id: any): void {
    this.modalAntService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Bạn có muốn xóa backlog này hay không?',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Bỏ qua',
      nzOnOk: () => this.deleteBacklog(id),
    });
  }

  deleteBacklog(id: any) {
    this.backlogService.deleteBacklog(id).subscribe((res) => {
      if(!res.isValid) {
        this.notificationService.showNotification(
          Constant.ERROR,
          res.errorMessage
        );
      } else {
        this.notificationService.showNotification(
          Constant.SUCCESS,
          res.message
        );
        this.getListBacklog();
      }
    });
  }
}
