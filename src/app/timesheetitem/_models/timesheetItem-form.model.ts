import { FormControl, Validators } from '@angular/forms';
import { TimesheetItem } from './TimesheetItem';

export class TimesheetItemForm {
  id = new FormControl();
  timesheetId = new FormControl();
  state = new FormControl();
  title = new FormControl();
  type = new FormControl();
  duration = new FormControl();
  hourlyRate = new FormControl();
  flSelected = new FormControl();
  total = new FormControl();
  date = new FormControl();

  constructor(timesheetItem: TimesheetItem) {
    this.id.setValue(timesheetItem.id);
    this.timesheetId.setValue(timesheetItem.timesheetId);
    this.state.setValue(timesheetItem.state);
    // this.state.setValidators([Validators.required]);
    this.flSelected.setValue(timesheetItem.flSelected);
    this.title.setValue(timesheetItem.title);
    // this.title.setValidators([Validators.required]);

    this.type.setValue(timesheetItem.type);

    this.hourlyRate.setValue(timesheetItem.hourlyRate);

    this.total.setValue(timesheetItem.total);
    // this.total.setValidators([Validators.required]);

    this.date.setValue(timesheetItem.date);
  }
}
