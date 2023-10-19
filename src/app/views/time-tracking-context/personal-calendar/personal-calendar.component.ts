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
    private modalService: NgbModal
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
    const modalRef: NgbModalRef = this.modalService.open(AddManualCheckModalComponent, {
      centered: true
    });
    modalRef.componentInstance.onSubmit = (): void => {
      let formValue = modalRef.componentInstance.form.value;
      let entity = {
        date_ended: `${this.getDateString(formValue.date_start)} ${this.getTimeString(formValue.time_end)}`,
        date_started: `${this.getDateString(formValue.date_start)} ${this.getTimeString(formValue.time_start)}`,
        user_id: this.user.id,
        status: 'closed',
      };
      this.createManualCheck(entity);
    }
  }

  private getTimeString(timeObject: any, seconds: boolean = false): string {
    let string = `${this.pad(timeObject.hour)}:${this.pad(timeObject.minute)}`;
    if (seconds) {
      string += `:${this.pad(timeObject.second)}`;
    }
    return string;
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }


  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  private createManualCheck(formValue: any): void {
    this.checkApiService.create(formValue).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Time added successfully",
      });
    });
  }
}
