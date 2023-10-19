import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualCheckModalComponent } from './add-manual-check-modal.component';

describe('AddManualCheckModalComponent', () => {
  let component: AddManualCheckModalComponent;
  let fixture: ComponentFixture<AddManualCheckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualCheckModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualCheckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
