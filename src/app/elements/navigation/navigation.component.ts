import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public currentHref: string = '';
  id: any;

  constructor(
    location: Location,
    router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentHref = location.path().slice(16);
      } else {
        this.currentHref = 'Home';
      }
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  toggleIcon: boolean = true;

  toggleLoveIcon() {
    this.toggleIcon = !this.toggleIcon;
  }

  dashboardArray = [
    '/admin',
    'overview',
    'my-wallets',
    'transactions',
    'coin-details',
    'portofolio',
    'market-capital',
  ];

  apsArray = [
    'backlog',
    'app-profile',
    'post-details',
    'email-compose',
    'email-inbox',
    'email-read',
    'app-calender',
    'ecom-product-grid',
    'ecom-product-list',
    'ecom-product-detail',
    'ecom-product-order',
    'ecom-checkout',
    'ecom-invoice',
    'ecom-customers',
  ];

  chartsArray = [
    'sprint',
    'chart-chartjs',
    'chart-apex',
    'apex-line',
    'apex-area',
    'apex-column',
    'apex-bar',
    'apex-mixed',
    'apex-timeline',
    'apex-candlestick',
    'apex-pie',
    'apex-radar',
    'apex-radialbar',
    'apex-polar-area',
    'apex-bubble',
    'apex-scatter',
    'apex-heatmap',
    'apex-treemap',
    'apex-sparklines',
  ];

  bootstrapArray = [
    'sprint-detail',
    'ui-accordion',
    'ui-alert',
    'ui-badge',
    'ui-button',
    'ui-datepicker',
    'ui-modal',
    'ui-button-group',
    'ui-list-group',
    'ui-media-object',
    'ui-card',
    'ui-carousel',
    'ui-dropdown',
    'ui-popover',
    'ui-progressbar',
    'ui-nav',
    'ui-rating',
    'ui-typography',
    'ui-table',
    'ui-pagination',
    'ui-timepicker',
    'ui-toast',
    'ui-tooltip',
    'ui-typeahead',
    'ui-grid',
  ];

  materialArray = [
    'mat-autocomplete',
    'mat-badge',
    'mat-bottom-sheet',
    'mat-button',
    'mat-button-toggle',
    'mat-card',
    'mat-checkbox',
    'mat-chips',
    'mat-datepicker',
    'mat-dialog',
    'mat-divider',
    'mat-expansion',
    'mat-form-field',
    'mat-grid-list',
    'mat-icon',
    'mat-input',
    'mat-list',
    'mat-menu',
    'mat-paginator',
    'mat-progress-bar',
    'mat-progress-spinner',
    'mat-radio',
    'mat-ripple',
    'mat-select',
    'mat-sidenav',
    'mat-slide-toggle',
    'mat-slider',
    'mat-snack-bar',
    'mat-sort',
    'mat-stepper',
    'mat-table',
    'mat-tab',
    'mat-tooltip',
    'mat-tree',
    'mat-toolbar',
  ];

  pluginsArray = ['uc-nestable', 'uc-lightgallery'];

  formsArray = ['form-element', 'form-validate'];
}
