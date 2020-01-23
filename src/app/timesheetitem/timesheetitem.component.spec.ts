import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetitemComponent } from './timesheetitem.component';

describe('TimesheetitemComponent', () => {
  let component: TimesheetitemComponent;
  let fixture: ComponentFixture<TimesheetitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
