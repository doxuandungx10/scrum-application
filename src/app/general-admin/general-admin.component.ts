import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-general-admin',
  templateUrl: './general-admin.component.html',
  styleUrls: ['./general-admin.component.css'],
})
export class GeneralAdminComponent implements OnInit {
  title = 'kripton';
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;

  constructor(
    public sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  navigate() {
    this.router.navigateByUrl('admin');
  }
}
