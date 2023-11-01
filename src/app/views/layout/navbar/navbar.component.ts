import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import {DatePipe, DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import {CheckApiService} from "../../../core/services/check.api.service";
import {UserService} from "../../../core/services/user.service";
import Swal from "sweetalert2";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CheckInModalComponent} from "../../time-tracking-context/check-in-modal/check-in-modal.component";
import {LoadingService} from "../../../core/services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any = null;
  counter: any = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private checkApiService: CheckApiService,
    private userService: UserService,
    private modalService: NgbModal,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.userService.getCheck().subscribe(activeCheck => {
      if (activeCheck !== null) {
        const startedTimeStamp = new Date(activeCheck.date_started);
        let currentTimeStamp = new Date();
        currentTimeStamp.setHours(currentTimeStamp.getHours() + (currentTimeStamp.getTimezoneOffset() / 60));
        if (currentTimeStamp && startedTimeStamp) {
          this.counter = currentTimeStamp.getTime() - startedTimeStamp.getTime();
          this.addCounter();
        }
      }
    });
    this.userService.getUserEntity().subscribe(user => {
      this.user = user;
    });
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  public checkIn() {
    const modalRef: NgbModalRef = this.modalService.open(CheckInModalComponent, {
      centered: true
    });
    modalRef.componentInstance.onSubmit = (): void => {
      this.checkInAction(modalRef.componentInstance.form.value);
    }
  }

  public checkInAction(body: any): void {
    this.checkApiService.checkIn(body).subscribe(res => {
      this.loadingService.setLoading(false);
      this.counter = 0;
      this.addCounter();
      this.userService.setCheck(res.data);
    });
  }

  private addCounter(): void {
    setInterval(() => {
      if (this.counter === null) {
        return;
      }
      this.counter += 1000;
    }, 1000)
  }

  public checkOut(): void {
    this.checkApiService.checkOut().subscribe(res => {
      this.loadingService.setLoading(false);
      this.counter = null;
      this.userService.setCheck(null);
    })
  }
}
