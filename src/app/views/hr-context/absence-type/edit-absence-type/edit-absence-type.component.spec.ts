import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbsenceTypeComponent } from './edit-absence-type.component';

describe('EditAbsenceTypeComponent', () => {
  let component: EditAbsenceTypeComponent;
  let fixture: ComponentFixture<EditAbsenceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbsenceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAbsenceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
