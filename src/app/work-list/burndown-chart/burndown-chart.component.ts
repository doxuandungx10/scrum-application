import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { SprintService } from 'src/app/services/sprint.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/share/Constants/Constant';

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
  dataChartRadial: any;
  workingDays: number = 0;
  listUser: any;
  listColor: any;
  myForm: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private sprintService: SprintService,
    private chartService: BurndownChartService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      userChecked: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.router.parent?.params.subscribe((parameter) => {
      this.projectId = parameter.id;
    });
    // this.initChart();
    this.getListUser();
    this.getListSprint();
  }

  getListUser() {
    this.userService.getListUserByProjectId(this.projectId).subscribe((res) => {
      this.listUser = res;
      this.listColor = Constant.RANDOM_COLOR.slice(0, this.listUser.length);
      console.log('listUser', this.listUser);
    });
  }

  getListSprint() {
    this.sprintService.getListSprint(this.projectId).subscribe((res) => {
      this.listSprint = res;
      this.selectedSprint = this.listSprint[0];
      this.workingDays = this.listSprint[0].workingDays;
      this.getRemainDataBySprintId();
      this.getPercentageCompleted();
    });
  }

  getRemainDataBySprintId() {
    this.chartService.getRemainDataBySprintId(this.selectedSprint.id).subscribe((res) => {
        this.dataChart = res;
        this.lineChartOptions = {
          series: [
            {
              name: 'Đường lý tưởng',
              data: [],
            },
            {
              name: 'Đường thực tế',
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
        this.lineChartOptions.series[0].data.push(0);
        for (let i = 1; i <= this.workingDays; i++) {
          if (this.myForm.value.userChecked.length == 0) {
            let transformData = this.dataChart
              .filter((el: any) => el.date == i)
              .reduce((a: any, b: any) => a + b.remainTime, 0);

            this.lineChartOptions.series[1].data.push(transformData);
            this.lineChartOptions.series[0].data.push(8 * this.listUser.length * i);
          } else {
            let transformData = this.dataChart
              .filter((el: any) => el.date == i && this.myForm.value.userChecked.includes(el.userId))
              .reduce((a: any, b: any) => a + b.remainTime, 0);

            this.lineChartOptions.series[1].data.push(transformData);
            this.lineChartOptions.series[0].data.push(8 * this.myForm.value.userChecked.length * i);
          }
          // if(i !== this.workingDays) {
          // } else {
          //   let length = this.lineChartOptions.series[1].data.length;
          //   this.lineChartOptions.series[1].data.push(this.lineChartOptions.series[1].data[length-1]);
          // }
          this.lineChartOptions.xaxis.categories.push(i);
        }
        let length = this.lineChartOptions.series[1].data.length;
        this.lineChartOptions.series[1].data.push(
          this.lineChartOptions.series[1].data[length - 1]
        );
        this.lineChartOptions.series[0].data =
          this.lineChartOptions.series[0].data.reverse();
      });
  }

  getPercentageCompleted() {
    this.chartService.getPercentageCompleted(this.selectedSprint.id).subscribe((res) => {
      this.dataChartRadial = res;
      this.radialBarOptions = {
        series: [],
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
        labels: [
          'Completed',
          'Completed',
          'Completed',
          'Completed',
          'Completed',
        ],
        colors: this.listColor,
      };
      let o = {};
      let result = this.dataChartRadial.reduce(function (r, el) {
        let e = el.userId;
        if (!o[e]) {
          o[e] = {
            userId: el.userId,
            fullName: el.fullName,
            tasks: [],
          };
          r.push(o[e]);
        }
        o[e].tasks.push({
          estimatedTime: el.estimatedTime,
          status: el.status
        });
        return r;
      }, []);
      this.dataChartRadial = result.map((el) => ({
        ...el,
        totalTime: el.tasks.reduce((a, c) => a + c.estimatedTime, 0),
        completedTime: el.tasks.filter(el => el.status == 2).reduce((a, c) => a + c.estimatedTime, 0),
        percentageCompleted: Math.floor(el.tasks.filter(el => el.status == 2).reduce((a, c) => a + c.estimatedTime, 0)/el.tasks.reduce((a, c) => a + c.estimatedTime, 0)*100),
        color: this.listColor
      }));
      this.dataChartRadial.forEach(el => {
        this.radialBarOptions.series.push(el.percentageCompleted);
      });
      console.log(this.dataChartRadial);
    })
  }

  onChangeSelectSprint(data: any) {
    console.log(data);
    this.selectedSprint = data;
    this.workingDays = data.workingDays;
    this.getRemainDataBySprintId();
    this.getPercentageCompleted();
  }
  
  onChange(id: number, event: any) {
    const emailFormArray = <FormArray>this.myForm.controls.userChecked;
    if (event.target.checked) {
      emailFormArray.push(new FormControl(id));
    } else {
      let index = emailFormArray.controls.findIndex((x) => x.value == id);
      emailFormArray.removeAt(index);
    }
    this.getRemainDataBySprintId();
  }
}
