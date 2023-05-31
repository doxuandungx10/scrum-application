import { Component, Input, OnInit } from '@angular/core';
import { SprintbacklogService } from 'src/app/services/sprintbacklog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareService } from 'src/app/services/share.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

import { Task } from 'src/app/share/class/task.class';
import { SprintBacklog } from 'src/app/share/class/sprintbacklog.class';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.scss'],
})
export class SprintDetailComponent implements OnInit {
  listUser: any;
  projectId: any;

  listSprint: any;
  selectedSprintId: number = 0;
  selectedSprintBacklog: SprintBacklog = {
    id: 0,
    backlogId: 0,
    backlogName: '',
    name: '',
    status: 0,
    priority: 1,
    percentageRemain: 0,
    isTarget: false,
    totalTask: 0,
    doneTask: 0,
  };
  listSprintBacklog: any;
  isVisibleAddTask: boolean = false;
  taskForm: FormGroup;
  listTask: any[] = [];
  emptyTask: Task = {
    id: 0,
    sprintBacklogId: 0,
    userId: 0,
    fullName: '',
    name: '',
    status: 0,
    priority: 0,
    description: '',
    note: '',
    estimatedTime: 0,
    listTaskDetail: [],
  };
  listTimeUser: any;
  workingDayOfSprint: any[] = [];

  constructor(
    private router: ActivatedRoute,
    private sprintbacklogService: SprintbacklogService,
    private fb: FormBuilder,
    private shareService: ShareService,
    private taskService: TaskService,
    private sprintService: SprintService,
    private userService: UserService
  ) {
    this.taskForm = this.fb.group({
      id: [null],
      sprintBacklogId: [null],
      userId: [null],
      name: [null],
      status: [null],
      priority: [null],
      description: [null],
      note: [null],
      estimatedTime: [null],
    });
  }

  async ngOnInit() {
    this.router.parent?.params.subscribe((parameter) => {
      this.projectId = parameter.id;
      console.log(this.projectId);
      console.log(parameter);
    });
    await this.getListSprint();
    await this.getListUser();
  }

  getListUser() {
    this.userService.getListUserByProjectId(this.projectId).subscribe((res) => {
      this.listUser = res;
      console.log('listUser', this.listUser);
    });
  }

  getListSprint() {
    this.sprintService.getListSprint(this.projectId).subscribe((res) => {
      this.listSprint = res;
      this.selectedSprintId = this.listSprint[0].id;
      this.getListSprintBacklog();
      this.getTimeUser();
    });
  }

  selectedSprint(id: number) {
    this.selectedSprintId = id;
    this.getListSprintBacklog();
    this.getTimeUser();
  }

  getListSprintBacklog() {
    this.sprintbacklogService
      .getListSprintBacklog(this.selectedSprintId)
      .subscribe((res) => {
        this.listSprintBacklog = res.listTask;
        this.workingDayOfSprint = Array.from(
          { length: res.workingDay },
          (x, i) => i + 1
        );
        console.log('workingDayOfSprint', this.workingDayOfSprint);
      });
  }

  addTask() {
    console.log('listTask', this.listTask);
    this.taskService
      .updateTask(this.selectedSprintBacklog.id, this.listTask)
      .subscribe((res) => {
        this.isVisibleAddTask = false;
        this.getListSprintBacklog();
        this.getListUser();
        this.getTimeUser();
      });
  }
  convertStatusText(status: number): string {
    return this.shareService.convertStatusText(status);
  }
  openModalAddTask(data: any) {
    this.selectedSprintBacklog = data;
    this.listTask = data.listTasks;
    console.log('data', data.listTasks);

    this.isVisibleAddTask = true;
    if (this.listTask.length == 0) {
      this.addBoxTask();
    }
  }
  handleCancelAdd() {
    console.log('listTask', this.listTask);
    this.isVisibleAddTask = false;
    this.listTask = [];
  }
  addBoxTask() {
    var emptyTask: Task = {
      id: 0,
      sprintBacklogId: 0,
      userId: 0,
      fullName: '',
      name: '',
      status: 0,
      priority: 0,
      description: '',
      note: '',
      estimatedTime: 0,
      listTaskDetail: [],
    };
    this.listTask.push(emptyTask);
  } //getTimeOfUserBySprintId

  getTimeUser() {
    this.userService
      .getTimeOfUserBySprintId(this.selectedSprintId, this.projectId)
      .subscribe((res) => {
        this.listTimeUser = res;
        console.log('getTimeUser', res);
      });
  }
}
