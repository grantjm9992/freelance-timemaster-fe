import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhosInComponent } from './whos-in.component';

describe('WhosInComponent', () => {
  let component: WhosInComponent;
  let fixture: ComponentFixture<WhosInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhosInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhosInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
