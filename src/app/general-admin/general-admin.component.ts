import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { ProjectService } from 'src/app/services/project.service';


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

  constructor(
    public sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  async ngOnInit() {
    await (this.userOnline = JSON.parse(localStorage.getItem('user')!));
    this.getListProjectByUser();
  }

  navigate() {
    this.router.navigateByUrl('admin');
  }

  getListProjectByUser() {
    this.projectService.getListProject(this.userOnline.id).subscribe((res) => {
      console.log('huongntt', res);
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
}
