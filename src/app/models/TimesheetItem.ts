import { Time } from '@angular/common';

export class TimesheetItem {
  id: number;
  timesheetId: number;
  state: string;
  title: string;
  type: string;
  duration: Time;
  hourlyRate: number;
  total: number;
  date: Date;
  constructor(
    id?: number,
    timesheetId?: number,
    title?: string,
    hourlyRate?: number,
    total?: number,
    date?: Date,
    type?: string,
    duration?: Time,
    state?: string
  ) {
    this.id = id;
    this.timesheetId = timesheetId;
    this.title = title;
    this.hourlyRate = hourlyRate;
    this.total = total;
    this.date = date;
    this.type = type;
    this.duration = duration;
    this.state = state;
  }
}
