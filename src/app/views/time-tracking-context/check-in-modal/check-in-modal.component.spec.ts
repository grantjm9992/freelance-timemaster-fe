import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInModalComponent } from './check-in-modal.component';

describe('CheckInModalComponent', () => {
  let component: CheckInModalComponent;
  let fixture: ComponentFixture<CheckInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
