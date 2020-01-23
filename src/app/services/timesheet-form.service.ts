import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Timesheet } from '../models/timesheet';
import { TimesheetForm } from '../models/timesheet-form.model';
import { TimesheetItemForm } from '../models/timesheetItem-form.model';
import { TimesheetItem } from '../models/TimesheetItem';

@Injectable()
export class TimesheetFormService implements OnDestroy {
  editTimeSheet: Timesheet;
  private timesheetForm: BehaviorSubject<
    FormGroup | undefined
  > = new BehaviorSubject(this.fb.group(new TimesheetForm(new Timesheet())));
  trForm$: Observable<FormGroup> = this.timesheetForm.asObservable();

  constructor(private fb: FormBuilder) {}

  addTimesheetItem() {
    const currentTimesheet = this.timesheetForm.getValue();
    const currentTimesheetItems = currentTimesheet.get(
      'timesheetItems'
    ) as FormArray;

    currentTimesheetItems.push(
      this.fb.group(new TimesheetItemForm(new TimesheetItem()))
    );
    console.log('currentTimesheet: ', currentTimesheet);
    this.timesheetForm.next(currentTimesheet);
  }
  addExistingTimesheetItem(timesheetItem: TimesheetItem) {
    const currentTimesheet = this.timesheetForm.getValue();
    const currentTimesheetItems = currentTimesheet.get(
      'timesheetItems'
    ) as FormArray;
    currentTimesheetItems.push(
      this.fb.group(new TimesheetItemForm(timesheetItem))
    );
    this.timesheetForm.next(currentTimesheet);
  }
  deleteTimesheetItem(i: number) {
    const currentTimesheet = this.timesheetForm.getValue();
    const currentTimesheetItems = currentTimesheet.get(
      'timesheetItems'
    ) as FormArray;

    currentTimesheetItems.removeAt(i);

    this.timesheetForm.next(currentTimesheet);
  }

  ngOnDestroy() {
    this.timesheetForm.next(this.fb.group(new TimesheetForm(new Timesheet())));
  }
}
