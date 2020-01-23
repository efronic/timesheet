import { FormControl, FormArray, Validators } from '@angular/forms';
import { Timesheet } from './timesheet';

export class TimesheetForm {
  id = new FormControl();
  defaultHourlyRate = new FormControl();
  timesheetItems = new FormArray([]);

  constructor(timesheet: Timesheet) {
    if (timesheet.id) {
      this.id.setValue(timesheet.id);
    }
    if (timesheet.defaultHourlyRate) {
      this.defaultHourlyRate.setValue(timesheet.defaultHourlyRate);
    }
    if (timesheet.timesheetItems) {
      this.timesheetItems.setValue(timesheet.timesheetItems);
    }
    this.timesheetItems.setValidators([Validators.required]);
  }
}
