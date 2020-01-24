import { Component, OnInit, OnDestroy } from '@angular/core';
import { Timesheet } from './_models/timesheet';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TimesheetService } from './_services/timesheet.service';
import { TimesheetFormService } from './_services/timesheet-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  timesheet: Timesheet;
  existingTimesheet: Timesheet;
  timesheets: Timesheet[];
  TimesheetForm: FormGroup;
  submitted = false;
  viewMode: string;

  formsReady = false;
  buttonsReady = true;
  showSubmitButton = false;
  selectedType: string;
  TimesheetFormSub: Subscription;
  formInvalid = false;
  timesheetItems: FormArray;

  pageTitle: string;

  title = 'Timesheet';
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private timesheetService: TimesheetService,
    private timesheetFormService: TimesheetFormService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.pageTitle = 'New Timesheet';
    console.log('this.editTimesheet', this.existingTimesheet);

    this.TimesheetFormSub = this.timesheetFormService.tsForm$.subscribe(cp => {
      this.TimesheetForm = cp;
      this.timesheetItems = this.TimesheetForm.get(
        'timesheetItems'
      ) as FormArray;
    });
    // this.TimesheetForm.patchValue({
    //   financialYear: this.selectedType,
    //   companyId: this.selectedCompany,
    //   flUnknown: false,
    //   flClosed: false
    // });
    // this.formControlValueChanged();
  }
  ngOnDestroy() {
    this.TimesheetFormSub.unsubscribe();
  }
  setFormAsDetailsView() {}

  formControlValueChanged() {
    this.TimesheetForm.get('companyId').valueChanges.subscribe(
      (value: number) => {
        // this.selectedCompany = value;
        // this.getProjectCode();
      }
    );
    this.TimesheetForm.get('financialYear').valueChanges.subscribe(
      (value: string) => {
        this.selectedType = value;
        // this.getProjectCode();
      }
    );
    this.TimesheetForm.get('flUnknown').valueChanges.subscribe(
      (value: boolean) => {
        // this.flUnknown = value;
        // this.getProjectCode();
      }
    );
  }
  addTimesheetItem() {
    this.timesheetFormService.addTimesheetItem();
    this.childSelected();
  }

  deleteTimesheetItem(index: number) {
    console.log('deleting item', index);

    this.timesheetFormService.deleteTimesheetItem(index);
    this.childSelected();
    this.openSnackBar('Item removed.', 'OK');
  }
  childSelected() {
    if (
      this.TimesheetForm.value.timesheetItems.filter(x => x.flSelected === true)
        .length > 0
    ) {
      this.showSubmitButton = true;
    } else {
      this.showSubmitButton = false;
    }
    console.log('this.showsubmitbutton() ', this.showSubmitButton);
    console.log('this.TimesheetForm.invalid ', this.TimesheetForm.invalid);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
  close() {
    this.timesheetFormService.ngOnDestroy();

    // this.router.navigate(['/home']);
  }
  submit() {
    this.submitted = !this.submitted;
    this.openSnackBar('Selected items are submitted.', 'OK');
    console.log(this.TimesheetForm.value);
  }
}
