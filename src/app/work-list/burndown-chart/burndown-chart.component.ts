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
} from 'ng-apexcharts';

export type ChartOptions = {
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

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css'],
})
export class BurndownChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  projectId: any;
  listSprint: any;
  selectedSprintId: number = 0;

  constructor(
    private router: ActivatedRoute,
    private sprintbacklogService: SprintbacklogService,
    private fb: FormBuilder,
    private shareService: ShareService,
    private taskService: TaskService,
    private sprintService: SprintService,
    private userService: UserService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Ideal burndown',
          data: [320, 288, 256, 224, 192, 160, 128, 96, 64, 32, 0],
        },
        {
          name: 'Actual line',
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32],
        }
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 5,
        curve: 'straight',
        dashArray: [8, 0],
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
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        labels: {
          trim: false,
        },
        categories: [
          '01 Jan',
          '02 Jan',
          '03 Jan',
          '04 Jan',
          '05 Jan',
          '06 Jan',
          '07 Jan',
          '08 Jan',
          '09 Jan',
          '10 Jan',
          '11 Jan',
          '12 Jan',
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: any) {
                return val + ' (mins)';
              },
            },
          },
          {
            title: {
              formatter: function (val: any) {
                return val + ' per session';
              },
            },
          },
          {
            title: {
              formatter: function (val: any) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    };
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
      this.selectedSprintId = this.listSprint[0].id;
    });
  }

  selectedSprint(id: number) {
    this.selectedSprintId = id;
  }
}
