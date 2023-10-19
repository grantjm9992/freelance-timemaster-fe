import { Component, OnInit } from '@angular/core';
import {WhosInApiService} from "../../../core/services/whos-in.api.service";
import {WhosIn, WhosInResponse} from "../../../core/models/whos-in.model";

@Component({
  selector: 'app-whos-in',
  templateUrl: './whos-in.component.html',
  styleUrls: ['./whos-in.component.scss']
})
export class WhosInComponent implements OnInit {

  active: any[] = [];
  inactive: any[] = [];
  constructor(
    private whosInService: WhosInApiService
  ) { }

  ngOnInit(): void {
    this.whosInService.getAll().subscribe((res: WhosInResponse) => {
      this.active = res.data.activeUsers;
      this.inactive = res.data.inactiveUsers;
    });
  }

  getInitials(user: any) {
    const initials = user.name.charAt(0) + user.surname.charAt(0);
    return initials.toUpperCase();
  }
}
