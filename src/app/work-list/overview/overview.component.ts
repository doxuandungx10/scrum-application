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


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  projectId = 8;
  enableEditProject: boolean = false;
  project: any;
  listUser: any[] = [];
  listAllUserSystem: any[] = [];
  initialProject: any;
  listSelectedUserId: any;
  isVisibleAddUser: boolean = false;

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    private modalService: NgbModal
  ) {
    // this.router.parent.snapshot.paramMap((params) => {
    //   console.log(params.id);
    // });
  }

  ngOnInit() {
    this.getProjectInfo();
    this.getListUserByProjectId();
    this.getListUser();
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
      console.log('listAllUserSystem', this.listAllUserSystem);
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
    console.log('this.listSelectedUserId', this.listSelectedUserId);
    this.userService
      .addMemberToProject(this.listSelectedUserId, this.projectId)
      .subscribe((res) => {
        this.getListUserByProjectId();
      });
  }

  handleCancel() {
    this.isVisibleAddUser = false;
  }

  openModalAddUser() {
    this.isVisibleAddUser = true;
  }
}
