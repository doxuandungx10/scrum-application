import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/share/class/task.class';
import { TaskService } from 'src/app/services/task.service';
import { ShareService } from 'src/app/services/share.service';
import { SprintService } from 'src/app/services/sprint.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/share-service/notification.service';
import { Constant } from 'src/app/share/Constants/Constant';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  listSprint: any;
  listUser: any;
  projectId: any;

  listTaskTodo: Task[] = [];
  listTaskTodoId: string[] = [];
  listTaskDoing: Task[] = [];
  listTaskDoingId: string[] = [];
  listTaskDone: Task[] = [];
  listTaskDoneId: string[] = [];
  listTask: Task[] = [];
  selectedSprintId: number = 0;
  selectedUserId: number | null = null;
  isVisibleUpdateTime: boolean = false;
  selectedTask: Task = {
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
  workingDayOfSprint: any[] = [];

  constructor(
    private taskService: TaskService,
    private shareService: ShareService,
    private sprintService: SprintService,
    private notification: NzNotificationService,
    private userService: UserService,
    private router: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

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
      this.getListTask();
      this.setWorkingDayOfSprint();
    });
  }

  onChangeSprint() {
    this.getListTask();
    this.setWorkingDayOfSprint();
  }

  setWorkingDayOfSprint() {
    var selectedSprint = this.listSprint.find(
      (s: any) => s.id == this.selectedSprintId
    );
    if (selectedSprint) {
      this.workingDayOfSprint = Array.from(
        { length: selectedSprint.workingDays },
        (x, i) => i + 1
      );
    }
  }

  getListTask() {
    this.taskService.getListTask(this.selectedSprintId).subscribe((res) => {
      this.listTask = res;
      this.setValue();
    });
  }

  getListTaskOfUser() {
    if (this.selectedUserId !== null) {
      this.taskService
        .getListTaskOfUser(this.selectedSprintId, this.selectedUserId)
        .subscribe((res) => {
          this.listTask = res;
          this.setValue();
        });
    } else {
      this.getListTask();
    }
  }
  setValue() {
    this.listTaskTodo = this.listTask.filter((e) => e.status == 0);
    this.listTaskTodoId = this.listTaskTodo.map((e) => e.id.toString());

    this.listTaskDoing = this.listTask.filter((e) => e.status == 1);
    this.listTaskDoingId = this.listTaskDoing.map((e) => e.id.toString());

    this.listTaskDone = this.listTask.filter((e) => e.status == 2);
    this.listTaskDoneId = this.listTaskDone.map((e) => e.id.toString());
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log('event', event.previousContainer, event.container);
    let changedTaskId = null;
    let changedStatus = 0;
    for (let id of this.listTaskTodoId) {
      for (let item of this.listTask) {
        if (item.id == parseInt(id) && item.status != 0) {
          item.status = 0;
          changedTaskId = item.id;
          changedStatus = 0;
          break;
        }
      }
      if (changedTaskId !== null) {
        break;
      }
    }
    for (let id of this.listTaskDoingId) {
      for (let item of this.listTask) {
        if (item.id == parseInt(id) && item.status != 1) {
          item.status = 1;
          changedTaskId = item.id;
          changedStatus = 1;
          break;
        }
      }
      if (changedTaskId !== null) {
        break;
      }
    }
    for (let id of this.listTaskDoneId) {
      for (let item of this.listTask) {
        if (item.id == parseInt(id) && item.status != 2) {
          item.status = 2;
          changedTaskId = item.id;
          changedStatus = 2;
          break;
        }
      }
      if (changedTaskId !== null) {
        break;
      }
    }
    this.setValue();
    if (changedTaskId !== null) {
      this.updateTaskStatus(changedTaskId, changedStatus);
    }
  }

  updateTaskStatus(taskId: number, status: number) {
    this.taskService.updateTaskStatus(taskId, status).subscribe((res) => {
      this.notificationService.showNotification(
        Constant.SUCCESS,
        Constant.MESSAGE_UPDATE_SUCCESS
      );
    });
  }

  filterData() {}
  convertStatusText(status: number): string {
    return this.shareService.convertStatusText(status);
  }

  openModalEdit() {}

  openModalUpdateTime(task: Task) {
    this.selectedTask = task;
    this.isVisibleUpdateTime = true;
  }

  onCancelUpdateTime() {
    this.isVisibleUpdateTime = false;
  }

  onOkUpdateTime() {
    this.taskService.updateTaskInBoard(this.selectedTask).subscribe(
      (res) => {
        this.isVisibleUpdateTime = false;
        this.notification.success('Thông báo', 'Cập nhật thành công!');
      },
      (error) => {
        this.notification.error('Thông báo', 'Có lỗi xảy ra!');
      }
    );
  }

  getNameByUserId(userId: number) {
    var user = this.listUser.find((u: any) => u.userId == userId);
    if (user) {
      return user.fullName;
    }
  }
}
