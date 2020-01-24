import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SimpleChange,
  OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatCheckboxChange, MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { TimesheetFormService } from '../_services/timesheet-form.service';
import { ConfirmationDialogService } from '../_services/confirmationDialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timesheetitem',
  templateUrl: './timesheetitem.component.html',
  styleUrls: ['./timesheetitem.component.scss']
})
export class TimesheetitemComponent implements OnInit, OnChanges {
  exisitingForm = false;
  @Input() submitted: boolean;
  flItemSaved = false;
  flItemChecked = false;
  flItemEditMode = false;
  flItemSubmitted = false;
  @Input() viewMode: string;
  @Input() defaultHourlyRate: number;
  @Input() TimesheetItemForm: FormGroup;
  @Input() index: number;
  @Output() deleteTimesheetItem: EventEmitter<number> = new EventEmitter();
  @Output() childSelected: EventEmitter<boolean> = new EventEmitter();
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
    private overlay: Overlay,
    private snackBar: MatSnackBar,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit() {
    if (this.TimesheetItemForm.get('timesheetId').value) {
      this.exisitingForm = true;
    }
    this.TimesheetItemForm.patchValue({
      state: 'Active'
    });
    this.TimesheetItemForm.patchValue({ hourlyRate: this.defaultHourlyRate });
    this.TimesheetItemForm.patchValue({
      date: new Date()
    });
    this.TimesheetItemForm.controls.state.disable();
    this.TimesheetItemForm.controls.total.disable();
    console.log('index ', this.index);
    this.onChanges();
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    console.log('new changes: ', changes);
    console.log(
      'new changes: ',
      this.TimesheetItemForm.controls.flSelected.value
    );
    console.log('this.flitemsubmitted: ', this.flItemSubmitted);
    if (this.TimesheetItemForm.controls.flSelected.value) {
      console.log('this is getting triggered.', changes.submitted);
      this.TimesheetItemForm.patchValue({
        state: 'Submitted'
      });
      this.flItemSubmitted = true;
      this.TimesheetItemForm.controls.date.disable();
      this.TimesheetItemForm.controls.title.disable();
      this.TimesheetItemForm.controls.type.disable();
      this.TimesheetItemForm.controls.duration.disable();
      this.TimesheetItemForm.controls.hourlyRate.disable();
      this.TimesheetItemForm.controls.flSelected.disable();
    } else {
    }
    // if (changes.selectedNOE && !changes.currency) {
    //   console.log(
    //     'resetting accountcodeid and accountcodedesc. changes.selectedNOE'
    //   );

    //   this.purchaseOrderItemForm.controls.accountCodeId.reset();
    //   this.purchaseOrderItemForm.controls.accountCodeDescription.reset();
    //   this.purchaseOrderItemForm.controls.accountCodeId.updateValueAndValidity();
    //   this.purchaseOrderItemForm.controls.accountCodeDescription.updateValueAndValidity();
    // }

    // this.calculateTotal();
  }
  get f() {
    return this.TimesheetItemForm.controls;
  }
  onChanges(): void {
    this.TimesheetItemForm.get('duration')
      .valueChanges //
      .subscribe(val => {
        this.calculateTotal();
      });
    this.TimesheetItemForm.get('hourlyRate')
      .valueChanges //
      .subscribe(val => {
        this.calculateTotal();
      });
  }
  openDialogForDeletion(
    warningMessage: string,
    headerMessage: string,
    comments?: string
  ): Observable<any> {
    return this.confirmationDialogService.confirm(
      warningMessage,
      headerMessage,
      comments
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
  calculateTotal() {
    const hourlyRate = this.TimesheetItemForm.controls.hourlyRate.value;
    const duration = this.TimesheetItemForm.controls.duration.value;
    if (hourlyRate && duration) {
      const parts = duration.split(':', 2);
      let hours = parts[0];
      let minutes = parts[1];
      if (minutes > 0 && minutes <= 15) {
        minutes = 15;
      } else if (minutes > 15 && minutes <= 30) {
        minutes = 30;
      } else if (minutes > 30 && minutes <= 45) {
        minutes = 45;
      } else if (minutes > 45 && minutes <= 59) {
        minutes = 0;
        hours = hours + 1;
      }
      const totalMinutes = hours * 60 + minutes;
      const totalRate = ((totalMinutes * hourlyRate) / 60).toFixed(2);
      this.TimesheetItemForm.patchValue({
        total: totalRate
      });
      console.log('hours ', hours);
      console.log('minutes ', minutes);
    }
  }
  addNew() {
    this.timesheetFormService.addTimesheetItem();
  }
  delete() {
    this.openDialogForDeletion(
      'Are you sure you want to delete this timesheet entry?',
      'Confirmation'
    ).subscribe(result => {
      console.log('returned answer from submit dialog', result);
      if (result) {
        // this.cancellationPurchaseOrder.id = this.createPurchaseOrder.id;
        // this.cancellationPurchaseOrder.cancelComments =
        //   result.cancellationComments;
        // console.log(
        //   'this.deletionTimesheetItem: ',
        //   this.deletionTimesheetItem
        // );
        this.deleteTimesheetItem.emit(this.index);
        this.openSnackBar('Item was deleted.', 'OK');
      }
    });
  }
  save() {
    // this.flItemSaved = true;
    this.TimesheetItemForm.patchValue({
      state: 'Active'
    });
    // this.flItemEditMode = true;
    this.flItemSaved = true;
    this.TimesheetItemForm.controls.date.disable();
    this.TimesheetItemForm.controls.title.disable();
    this.TimesheetItemForm.controls.type.disable();
    this.TimesheetItemForm.controls.duration.disable();
    this.TimesheetItemForm.controls.hourlyRate.disable();
    this.openSnackBar('Item has been saved.', 'OK');
    // this.TimesheetItemForm.controls.flSelected.disable();
  }
  update() {
    // this.flItemSaved = false;
    this.TimesheetItemForm.patchValue({
      state: 'Active'
    });
    this.flItemEditMode = true;
    this.flItemSubmitted = false;
    this.flItemSaved = false;
    // this.TimesheetItemForm.controls.date.enable();
    this.TimesheetItemForm.controls.title.enable();
    this.TimesheetItemForm.controls.type.enable();
    this.TimesheetItemForm.controls.duration.enable();
    this.TimesheetItemForm.controls.hourlyRate.enable();
    this.TimesheetItemForm.controls.flSelected.enable();
    this.TimesheetItemForm.patchValue({
      flSelected: false
    });
  }
  flSelectedChange(event: MatCheckboxChange) {
    console.log(
      'this.TimesheetItemForm.controls.flSelected.value',
      this.TimesheetItemForm.controls.flSelected.value
    );

    this.childSelected.emit(this.TimesheetItemForm.controls.flSelected.value);
  }
  cancel() {
    this.deleteTimesheetItem.emit(this.index);
  }
}
