import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { TimesheetFormService } from '../_services/timesheet-form.service';

@Component({
  selector: 'app-timesheetitem',
  templateUrl: './timesheetitem.component.html',
  styleUrls: ['./timesheetitem.component.scss']
})
export class TimesheetitemComponent implements OnInit {
  exisitingForm = false;
  @Input() submitted: boolean;
  @Input() viewMode: string;
  @Input() TimesheetItemForm: FormGroup;
  @Input() index: number;
  @Output() deleteTimesheetItem: EventEmitter<number> = new EventEmitter();
  selectedState: string;
  types: any[] = [
    { value: 'Telephone Call', name: 'Telephone Call' },
    { value: 'Research', name: 'Research' },
    { value: 'Drafting Document', name: 'Document' }
  ];
  states: any[] = [
    { value: 'Active', name: 'Active' },
    { value: 'Submitted', name: 'Submitted' }
  ];
  selectedAccountCodeName = '';
  constructor(
    private timesheetFormService: TimesheetFormService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  ngOnInit() {
    if (this.TimesheetItemForm.get('timesheetId').value) {
      this.exisitingForm = true;
    }
  }
  get f() {
    return this.TimesheetItemForm.controls;
  }

  addNew() {
    this.timesheetFormService.addTimesheetItem();
  }
  delete() {
    this.deleteTimesheetItem.emit(this.index);
  }
}
