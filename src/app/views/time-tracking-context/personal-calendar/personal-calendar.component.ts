import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import {CheckApiService} from "../../../core/services/check.api.service";
import {UserService} from "../../../core/services/user.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CheckInModalComponent} from "../check-in-modal/check-in-modal.component";
import {AddManualCheckModalComponent} from "../add-manual-check-modal/add-manual-check-modal.component";
import Swal from "sweetalert2";
import {User} from "../../../core/models/user.model";
import {Utils} from "../../../core/services/utils";
import {CheckService} from "../../../core/services/check.service";

@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrls: ['./personal-calendar.component.scss']
})
export class PersonalCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    },
    views: {
      timeGridOneDay: {
        type: 'timeGrid',
        duration: { days: 1 }
      }
    }
  };

  public user: User;
  constructor(
    private checkApiService: CheckApiService,
    private userService: UserService,
    private checkService: CheckService
  ) { }

  ngOnInit(): void {
    this.userService.getUserEntity().subscribe(user => {
      if (!user) {
        return;
      }
      this.user = user;
      this.checkApiService.getAll(`user_id=${user.id}`).subscribe(res => {
        this.calendarOptions.events = res.data;
      });
    });
  }

  addManualCheck(): void {
    this.checkService.addManualCheck(this.user);
  }
}
