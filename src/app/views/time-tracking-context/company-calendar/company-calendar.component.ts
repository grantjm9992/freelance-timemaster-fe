import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {CheckApiService} from "../../../core/services/check.api.service";
import {UserApiService} from "../../../core/services/user.api.service";

@Component({
  selector: 'app-company-calendar',
  templateUrl: './company-calendar.component.html',
  styleUrls: ['./company-calendar.component.scss']
})
export class CompanyCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'resourceTimeline',
    plugins: [dayGridPlugin, timeGridPlugin, resourceTimelinePlugin],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
  };
  constructor(private checkApiService: CheckApiService, private userApiService: UserApiService) { }

  ngOnInit(): void {
    this.checkApiService.getAll().subscribe(res => {
      this.calendarOptions.events = res.data;
    });
    this.userApiService.getAll().subscribe(res => {
      this.calendarComponent.resources = res.data;
    });
  }
}
