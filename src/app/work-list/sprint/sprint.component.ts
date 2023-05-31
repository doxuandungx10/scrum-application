import { Component, Input, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint.service';
import { SprintbacklogService } from 'src/app/services/sprintbacklog.service';
import { Sprint } from 'src/app/share/class/sprint.class';
import { SprintBacklog } from 'src/app/share/class/sprintbacklog.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common';
import { DayOff } from 'src/app/share/class/dayoff.class';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  projectId: any;
  @Input() listUser: any;

  listSprint: any;
  //listUser: any;
  listSprintBacklog: SprintBacklog[] = [];
  sprintBacklogForm: FormGroup;
  addSprintForm: FormGroup;
  sprintId: number = 0;
  isVisibleSprintBacklog: boolean = false;
  isVisibleAddSprint: boolean = false;
  //dayOffForm: FormGroup;
  listDayOff: DayOff[] = [];
  emptyDayOff: DayOff = {
    userId: 0,
    sprintId: 0,
    dayOff: new Date(),
    dayShift: 0,
  };
  isCollapseTime: boolean = true;
  isCollapseTarget: boolean = true;
  isCollapseList: boolean = true;
  listSprintTarget: any[] = [];
  // timeOffStart: string;
  // timeOffEnd: string;
  constructor(
    private sprintService: SprintService,
    private sprintbacklogService: SprintbacklogService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: ActivatedRoute
  ) {
    this.sprintBacklogForm = this.fb.group({
      id: [null],
      backlogId: [null],
      backlogName: [null],
      name: [null, [Validators.required]],
      status: 0,
      priority: [null, [Validators.required]],
      percentageRemain: [null, [Validators.required]],
    });
    this.addSprintForm = this.fb.group({
      id: 0,
      projectId: 0,
      name: [null],
      timeStart: [null],
      timeEnd: [null],
      timeOffStart: [null],
      timeOffEnd: [null],
      dayOffStart: [null],
      dayOffEnd: [null],
      // workingDay: [null],
    });
    // this.dayOffForm = this.fb.group({
    //   userId: [null],
    //   dayOff: [null],
    //   totalDayOff: [null]
    // })
  }

  async ngOnInit() {
    this.router.parent?.params.subscribe((parameter) => {
      this.projectId = parameter.id;
      console.log(this.projectId);
      console.log(parameter);
    });
    await this.getListSprint();
  }

  getListSprint() {
    this.sprintService.getListSprint(this.projectId).subscribe((res) => {
      this.listSprint = res;
      this.sprintId = this.listSprint[0].id;

      this.getListTimeOff();
      this.getListSprintBacklog();
      //this.getListSprintTarget();
    });
  }

  selectedSprint(sprintId: number) {
    this.sprintId = sprintId;
    this.getListTimeOff();
    this.getListSprintBacklog();
    this.isCollapseTime = false;
  }

  getListSprintBacklog() {
    this.sprintbacklogService
      .getListSprintBacklog(this.sprintId)
      .subscribe((res) => {
        this.listSprintBacklog = res.listTask;
        this.listSprintTarget = this.listSprintBacklog.filter(
          (e) => e.isTarget === true
        );
      });
  }

  goToSprint() {}

  showModalDetail(data: any) {
    this.isVisibleSprintBacklog = true;
    this.sprintBacklogForm.patchValue({
      id: data.id,
      backlogId: data.backlogId,
      backlogName: data.backlogName,
      name: data.name,
      status: data.status,
      priority: data.priority,
      percentageRemain: data.percentageRemain,
    });
    console.log('data', data);
  }

  handleCancelSprintBacklog() {
    this.isVisibleSprintBacklog = false;
  }

  updateSprintBacklog() {
    if (this.sprintBacklogForm.valid) {
      let form = this.sprintBacklogForm.value;
      let payload = {
        id: form.id,
        name: form.name,
        percentageRemain: form.percentageRemain,
        priority: form.priority,
      };
      this.sprintbacklogService
        .updateSprintBacklog(payload)
        .subscribe((res) => {
          this.isVisibleSprintBacklog = false;
          this.getListSprintBacklog();
        });
    }
  }

  openModalAddSprint() {
    this.isVisibleAddSprint = true;
  }

  handleCancelAddSprint() {
    this.isVisibleAddSprint = false;
  }

  addSprint() {
    if (this.addSprintForm.valid) {
      let form = this.addSprintForm.value;
      let payload = {
        id: 0,
        projectId: this.projectId,
        name: form.name,
        //timeStart: this.datePipe.transform(form.timeStart, 'dd/MM/yyyy'),
        //timeEnd: this.datePipe.transform(form.timeEnd, 'dd/MM/yyyy'),//form.timeEnd,
        timeStart: form.timeStart,
        timeEnd: form.timeEnd,
        // workingDay: 10,
        dayOffStart: this.addTimeToDayOffStart(
          form.dayOffStart,
          form.timeOffStart
        ),
        dayOffEnd: this.addTimeToDayOffEnd(form.dayOffEnd, form.timeOffEnd),
      };
      this.sprintService.addSprint(payload).subscribe((res) => {
        console.log('ok');
        this.isVisibleAddSprint = false;
        this.getListSprint();
      });
    }
  }
  addTimeToDayOffStart(dateOffStart: Date, timeOffStart: string) {
    if (timeOffStart === 'full') {
      return dateOffStart;
    } else {
      dateOffStart.setDate(dateOffStart.getDate() - 1);
      let day = dateOffStart.getDate();
      let month = dateOffStart.getMonth();
      let year = dateOffStart.getFullYear();
      return new Date(year, month, day, 12, 0);
    }
  }

  addTimeToDayOffEnd(dateOffEnd: Date, timeOffEnd: string) {
    if (timeOffEnd === 'full') {
      return dateOffEnd;
    } else {
      dateOffEnd.setDate(dateOffEnd.getDate() - 1);
      let day = dateOffEnd.getDate();
      let month = dateOffEnd.getMonth();
      let year = dateOffEnd.getFullYear();
      return new Date(year, month, day, 12, 0);
    }
  }

  addDayOff() {
    var emptyDayOff: DayOff = {
      userId: 0,
      sprintId: this.sprintId,
      dayOff: new Date(),
      dayShift: 0,
    };
    this.listDayOff.push(emptyDayOff);
  }

  removeTime(index: number) {
    this.listDayOff.splice(index, 1);
  }

  collapseTime() {
    this.isCollapseTime = !this.isCollapseTime;
  }

  updateTime() {
    this.listDayOff = this.listDayOff.filter((en) => en.userId != 0);
    if (this.listDayOff.length > 0) {
      this.sprintService.updateTimeOff(this.listDayOff).subscribe((res) => {
        console.log(res);
      });
    }
  }

  getListTimeOff() {
    this.sprintService.getListTimeOff(this.sprintId).subscribe((res) => {
      this.listDayOff = res.listTime;
      if (this.listDayOff.length == 0) this.addDayOff();
    });
  }

  collapseTarget() {
    this.isCollapseTarget = !this.isCollapseTarget;
  }

  collapseList() {
    this.isCollapseList = !this.isCollapseList;
  }

  insertSprintTarget(item: any) {
    let isTarget = !item.isTarget;
    console.log('item', item);
    this.listSprintBacklog = this.listSprintBacklog.map((e) =>
      e.id === item.id ? { ...e, isTarget: isTarget } : e
    );
    if (isTarget) {
      let payload = {
        sprintId: item.sprintId,
        sprintBacklogId: item.id,
        name: item.name,
      };
      this.sprintService.addSprintTarget(payload).subscribe((res) => {
        //
      });
    } else {
      let id = item.id;
      this.sprintService.removeSprintTarget(id).subscribe((res) => {
        //
      });
    }
    this.listSprintTarget = this.listSprintBacklog.filter(
      (e) => e.isTarget === true
    );
  }

  // getListSprintTarget(){
  //   console.log("getListSprintTarget", )
  //  this.sprintService.getListSprintTarget(this.sprintId).subscribe(res=>{
  //    this.listSprintTarget = res;
  //    console.log('initial listSprintTarget', res)
  //  })
  // }
}
