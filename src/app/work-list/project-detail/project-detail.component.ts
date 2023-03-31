import { Component, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Issue } from 'src/app/share/class/issue.class';
import { SprintService } from 'src/app/services/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/share/class/project.class';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  listIssue: Issue[] = [];
  listSprint: [] = [];
  listUser: any;
  projectId: any;
  project: Project = {
    id: 0,
    name: '',
    description: '',
  };
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private userService: UserService,
    public sharedService: SharedService
  ) {}

  async ngOnInit() {
    await (this.projectId = this.router.snapshot.paramMap.get('id'));
    this.getListSprint();
    await this.getProject();
    this.getListUser();
  }

  getListSprint() {
    this.sprintService.getListSprint(this.projectId).subscribe((res) => {
      this.listSprint = res;
    });
  }

  getProject() {
    this.projectService.getProjectById(this.projectId).subscribe((res) => {
      this.project = res;
    });
  }

  getListUser() {
    this.userService.getListUserByProjectId(this.projectId).subscribe((res) => {
      this.listUser = res;
    });
  }
}
