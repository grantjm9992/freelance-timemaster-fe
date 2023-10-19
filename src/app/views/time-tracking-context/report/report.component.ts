import { Component, OnInit } from '@angular/core';
import {CheckReportApiService} from "../../../core/services/check-report.api.service";
import {an} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public taskBarChartOptions: any = {};
  public projectBarChartOptions: any = {};
  public clientBarChartOptions: any = {};
  from: any;
  to: any;

  constructor(private checkReportApiService: CheckReportApiService) { }

  ngOnInit(): void {
    this.checkReportApiService.getByTask('2023-01-01', '2023-12-31').subscribe(res => {
      let categories: any[] = [];
      let data: any[] = [];
      res.forEach((obj: any) => {
        categories.push(obj.name);
        data.push(obj.time);
      });
      this.taskBarChartOptions = this.getBarChartOptions({
        bodyColor: "#000",
        cardBg: "#fff",
        primary: '#6571ff',
        gridBorder: "rgba(77, 138, 240, .15)",
        categories: categories,
        data: data
      });
    });
    this.checkReportApiService.getByProject('2023-01-01', '2023-12-31').subscribe(res => {
      let categories: any[] = [];
      let data: any[] = [];
      res.forEach((obj: any) => {
        categories.push(obj.name);
        data.push(obj.time);
      });
      this.projectBarChartOptions = this.getBarChartOptions({
        bodyColor: "#000",
        cardBg: "#fff",
        primary: '#6571ff',
        gridBorder: "rgba(77, 138, 240, .15)",
        categories: categories,
        data: data
      });
    });
    this.checkReportApiService.getByClient('2023-01-01', '2023-12-31').subscribe(res => {
      let categories: any[] = [];
      let data: any[] = [];
      res.forEach((obj: any) => {
        categories.push(obj.name);
        data.push(obj.time);
      });
      this.clientBarChartOptions = this.getBarChartOptions({
        bodyColor: "#000",
        cardBg: "#fff",
        primary: '#6571ff',
        gridBorder: "rgba(77, 138, 240, .15)",
        categories: categories,
        data: data
      });
    });
  }


  getBarChartOptions(obj: any) {
    return {
      series: [{
        name: 'Hours',
        data: obj.data
      }],
      chart: {
        type: 'bar',
        height: '320',
        parentHeightOffset: 0,
        foreColor: obj.bodyColor,
        background: obj.cardBg,
        toolbar: {
          show: false
        },
      },
      colors: [obj.primary],
      grid: {
        padding: {
          bottom: -4
        },
        borderColor: obj.gridBorder,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        categories: obj.categories,
        axisBorder: {
          color: obj.gridBorder,
        },
        axisTicks: {
          color: obj.gridBorder,
        },
      },
      yaxis: {
        labels: {
          offsetX: 0
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4
        }
      }
    }
  };

  filter(): void {
    this.checkReportApiService.getByTask(this.from, this.to).subscribe(res => {
      let categories: any[] = [];
      let data: any[] = [];
      res.forEach((obj: any) => {
        categories.push(obj.name);
        data.push(obj.time);
      });
      this.taskBarChartOptions.series = [{data: data, name: 'Hours'}];
      this.taskBarChartOptions.xaxis.categories = categories;
    });
    this.checkReportApiService.getByClient(this.from, this.to).subscribe(res => {
      let categories: any[] = [];
      let data: any[] = [];
      res.forEach((obj: any) => {
        categories.push(obj.name);
        data.push(obj.time);
      });
      this.clientBarChartOptions.series = [{data: data, name: 'Hours'}];
      this.clientBarChartOptions.xaxis.categories = categories;
    });
    this.checkReportApiService.getByProject(this.from, this.to).subscribe(res => {
      let categories: any[] = [];
      let data: any[] = [];
      res.forEach((obj: any) => {
        categories.push(obj.name);
        data.push(obj.time);
      });
      this.projectBarChartOptions.series = [{data: data, name: 'Hours'}];
      this.projectBarChartOptions.xaxis.categories = categories;
    });
  }

  setTo(date: any): void {
    this.to = this.getDateString(date);
  }

  setFrom(date: any): void {
    this.from = this.getDateString(date);
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
