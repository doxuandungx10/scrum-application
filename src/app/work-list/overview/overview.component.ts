import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from 'src/app/services/position.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/share-service/notification.service';
import { Constant } from 'src/app/share/Constants/Constant';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  projectId: any;
  enableEditProject: boolean = false;
  project: any;
  listUser: any[] = [];
  listAllUserSystem: any[] = [];
  initialProject: any;
  isVisibleAddUser: boolean = false;
  listPosition: any[] = [];
  formAdd = {
    userId: 0,
    positionId: 0,
    projectId: 0,
  };
  isEditingDescription: boolean = false;

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private positionService: PositionService,
    private projectService: ProjectService,
    private modalService: NgbModal,
    private modalAntService: NzModalService,
    private notificationService: NotificationService
  ) {
    // this.router.parent.snapshot.paramMap((params) => {
    //   console.log(params.id);
    // });
  }

  ngOnInit() {
    this.router.parent?.params.subscribe((parameter) => {
      this.projectId = parameter.id;
    });
    this.getProjectInfo();
    this.getListUserByProjectId();
    this.getListUser();
    this.getListPosition();
  }

  getListUserByProjectId() {
    this.userService.getListUserByProjectId(this.projectId).subscribe((res) => {
      this.listUser = res;
      console.log('dung', this.listUser);
    });
  }

  getListUser() {
    this.userService.getListUser().subscribe((res) => {
      this.listAllUserSystem = res;
    });
  }

  getListPosition() {
    this.positionService.getListPosition().subscribe((res) => {
      this.listPosition = res;
    });
  }

  getProjectInfo() {
    this.projectService.getProjectById(this.projectId).subscribe((res) => {
      this.project = res;
      console.log('dung', res);
      this.initialProject = this.project;
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.listAllUserSystem
          : this.listAllUserSystem.filter(
              (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  addUser() {
    this.formAdd.projectId = parseInt(this.projectId);
    console.log('this.listSelectedUserId', this.formAdd);
    this.userService.addMemberToProject(this.formAdd).subscribe((res) => {
      this.notificationService.showNotification(
        Constant.SUCCESS,
        'Thêm thành viên thành công'
      );
      this.getListUserByProjectId();
      this.isVisibleAddUser = false;
    });
  }

  handleCancel() {
    this.isVisibleAddUser = false;
  }

  openModalAddUser() {
    this.isVisibleAddUser = true;
  }

  showConfirm(id: any): void {
    this.modalAntService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Bạn có muốn xóa member hay không?',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Bỏ qua',
      nzOnOk: () => this.removeMember(id),
    });
  }

  removeMember(id: any) {
    this.userService.removeMemberFromProject(id).subscribe((res) => {
      this.notificationService.showNotification(
        Constant.SUCCESS,
        'Xóa thành viên thành công'
      );
      this.getListUserByProjectId();
    });
  }

  editDescription() {
    this.isEditingDescription = true;
  }

  cancelEditDescription() {
    this.isEditingDescription = false;
  }

  saveDescription() {
    this.projectService.updateProject(this.project).subscribe(res=>{
      this.isEditingDescription = false;
      this.notificationService.showNotification(
        Constant.SUCCESS,
        Constant.MESSAGE_UPDATE_SUCCESS
      );
    })
  }
}
