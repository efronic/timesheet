import { TimesheetItem } from './TimesheetItem';

export class Timesheet {
  id?: number;
  defaultHourlyRate?: number;
  timesheetItems?: TimesheetItem[];
  constructor(
    id?: number,
    defaultHourlyRate?: number,
    timesheetItems?: TimesheetItem[]
  ) {
    this.id = id;
    this.timesheetItems = timesheetItems;
    this.defaultHourlyRate = defaultHourlyRate;
  }
}
