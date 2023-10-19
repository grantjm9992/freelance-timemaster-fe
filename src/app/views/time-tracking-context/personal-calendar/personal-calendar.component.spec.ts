import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCalendarComponent } from './personal-calendar.component';

describe('PersonalCalendarComponent', () => {
  let component: PersonalCalendarComponent;
  let fixture: ComponentFixture<PersonalCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
