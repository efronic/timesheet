import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
  declarations: [AppComponent, TimesheetitemComponent],

  providers: [TimesheetFormService, TimesheetService],
  bootstrap: [AppComponent]
})
export class AppModule {}
