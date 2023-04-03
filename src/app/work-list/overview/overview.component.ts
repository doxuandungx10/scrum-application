import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

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
  
  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService
  ) {
    // this.router.parent.snapshot.paramMap((params) => {
    //   console.log(params.id);
    // });
  }
  
  ngOnInit(){
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
      console.log("dung", res);
      this.initialProject = this.project;
    });
  }
}
