import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'shared/material-module';
import { TimesheetitemComponent } from './timesheetitem/timesheetitem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimesheetFormService } from './_services/timesheet-form.service';
import { TimesheetService } from './_services/timesheet.service';
import { DeletiondialogComponent } from './_helpers/deletiondialog/deletiondialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, TimesheetitemComponent, DeletiondialogComponent],

  providers: [
    { provide: LOCALE_ID, useValue: 'en-AU' },
    TimesheetFormService,
    TimesheetService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeletiondialogComponent]
})
export class AppModule {}
