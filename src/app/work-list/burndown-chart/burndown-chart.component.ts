import { Component, OnInit, ViewChild } from '@angular/core';
import { SprintbacklogService } from 'src/app/services/sprintbacklog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareService } from 'src/app/services/share.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

import { Task } from 'src/app/share/class/task.class';
import { SprintBacklog } from 'src/app/share/class/sprintbacklog.class';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
} from 'ng-apexcharts';

import { BurndownChartService } from 'src/app/services/burndown-chart.service';

export type lineChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  stroke?: ApexStroke | any;
  dataLabels?: ApexDataLabels | any;
  markers?: ApexMarkers | any;
  tooltip?: any; // ApexTooltip;
  yaxis?: ApexYAxis | any;
  grid?: ApexGrid | any;
  legend?: ApexLegend | any;
  title?: ApexTitleSubtitle | any;
};

export type radialBarOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  labels: string[] | any;
  plotOptions: ApexPlotOptions | any;
  stroke: ApexStroke | any;
  colors: string[] | any;
};

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css'],
})
export class BurndownChartComponent implements OnInit {
  @ViewChild('lineChart') lineChart!: ChartComponent;
  public lineChartOptions: Partial<lineChartOptions>;

  @ViewChild('radialBar') radialBar!: ChartComponent;
  public radialBarOptions: Partial<radialBarOptions>;
  projectId: any;
  listSprint: any;
  selectedSprint: any;
  dataChart: any;
  workingDays: number = 0;
  listUser: any;

  constructor(
    private router: ActivatedRoute,
    private sprintService: SprintService,
    private chartService: BurndownChartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.router.parent?.params.subscribe((parameter) => {
      this.projectId = parameter.id;
    });
    this.initChart();
    this.getListUser();
    this.getListSprint();
  }

  initChart() {
    this.lineChartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'line',
      },
    };
    this.radialBarOptions = {
      series: [85, 60, 67, 50, 95],
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Completed', 'Completed', 'Completed', 'Completed', 'Completed'],
      colors: ['#ec8153', '#70b944', '#498bd9', '#6647bf', '#2454DF'],
    };
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
      this.selectedSprint = this.listSprint[0];
      this.workingDays = this.listSprint[0].workingDays;
      this.getRemainDataBySprintId();
    });
  }

  getRemainDataBySprintId() {
    this.chartService.getRemainDataBySprintId(this.selectedSprint.id).subscribe((res) => {
      this.dataChart = res;
      console.log(
        'chart',
        this.dataChart.filter((el: any) => el.date == 1)
      );
      this.lineChartOptions = {
        series: [
          {
            name: 'Ideal burndown',
            data: [],
          },
          {
            name: 'Actual line',
            data: [],
          },
        ],
        chart: {
          height: 350,
          type: 'line',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1, 6],
          curve: 'straight',
          dashArray: [4, 0],
        },
        title: {
          // text: 'Page Statistics',
          align: 'left',
        },
        legend: {
          tooltipHoverFormatter: function (val: any, opts: any) {
            return (
              val +
              ' - <strong>' +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              '</strong>'
            );
          },
        },
        markers: {
          size: 3,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          labels: {
            trim: false,
          },
          categories: [],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val: any) {
                  return val + ' còn:';
                },
              },
            },
            {
              title: {
                formatter: function (val: any) {
                  return val + ' còn:';
                },
              },
            },
          ],
        },
        grid: {
          borderColor: '#f1f1f1',
        },
      };
      this.lineChartOptions.series[0].data.push(0)
      for (let i = 1; i <= this.workingDays; i++) {
        let transformData = this.dataChart
          .filter((el: any) => el.date == i)
          .reduce((a: any, b: any) => a + b.remainTime, 0);
          this.lineChartOptions.series[1].data.push(transformData);
        // if(i !== this.workingDays) {
        // } else {
        //   let length = this.lineChartOptions.series[1].data.length;
        //   this.lineChartOptions.series[1].data.push(this.lineChartOptions.series[1].data[length-1]);
        // }
        this.lineChartOptions.series[0].data.push(8 * this.listUser.length * i);
        this.lineChartOptions.xaxis.categories.push(i);
      }
      let length = this.lineChartOptions.series[1].data.length;
      this.lineChartOptions.series[1].data.push(this.lineChartOptions.series[1].data[length-1]);
      this.lineChartOptions.series[0].data = this.lineChartOptions.series[0].data.reverse();
    });
  }

  onChangeSelectSprint(data: any) {
    console.log(data);
    this.selectedSprint = data;
    this.workingDays = data.workingDays;
    this.getRemainDataBySprintId();
  }
}
