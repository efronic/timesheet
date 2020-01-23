import { Component, OnInit, OnDestroy } from '@angular/core';
import { Timesheet } from './_models/timesheet';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog, MatSelectChange } from '@angular/material';
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
  showSubmitButton = true;
  selectedType: string;
  TimesheetFormSub: Subscription;
  formInvalid = false;
  timesheetItems: FormArray;

  pageTitle: string;
  
  selectedAccountType: string;
  selectedCurrency: string;
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
  }

  deleteTimesheetItem(index: number) {
    this.timesheetFormService.deleteTimesheetItem(index);
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
    // console.log('Timesheet saved!');
    console.log(this.TimesheetForm.getRawValue());
    console.log('this.TimesheetForm.valid', this.TimesheetForm.valid);
    if (this.TimesheetForm.valid) {
      this.buttonsReady = false;
      this.timesheet = Object.assign({}, this.TimesheetForm.getRawValue());

      console.log('this.timesheet to pass to api: ', this.timesheet);
      this.TimesheetForm.disable();
      if (this.existingTimesheet) {
        // existing timesheet
        console.log('exisiting timesheet');

        this.timesheetService.update(this.timesheet).subscribe(
          () => {
            console.log('updating this.timesheet: ', this.timesheet);
            console.log('Successful update!');
          },
          error => {
            this.buttonsReady = true;
            console.error('Unsuccessful update..');
            this.openSnackBar(error, 'Ok');
          },
          () => {
            this.buttonsReady = true;
            this.openSnackBar(
              'Timesheet is successfully updated. Thank you!',
              'Ok'
            );
            // this.router.navigate(['/home']);
          }
        );
      } else {
        this.timesheetService.add(this.timesheet).subscribe(
          () => {
            // console.log(this.timesheet);
            console.log('Successful insert!');
          },
          error => {
            this.buttonsReady = true;
            console.error('Unsuccessful insert..');
            this.openSnackBar(error, 'Ok');
          },
          () => {
            this.buttonsReady = true;
            this.timesheetFormService.ngOnDestroy();

            this.openSnackBar(
              'Your timesheet was successfully submitted. Thank you!',
              'Ok'
            );
            // this.router.navigate(['/home']);
          }
        );
      }
    }
    console.log(this.TimesheetForm.value);
  }
}
