import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { Timesheet } from '../models/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TravelRequestService {
  baseUrl = environment.apiUrl;
  editTimesheet: Timesheet;
  viewTimesheet: Timesheet;
  private loadingList = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingList.asObservable();
  private timesheetToBePassed = new BehaviorSubject<Timesheet>(
    this.viewTimesheet
  );
  existingTimesheet = this.timesheetToBePassed.asObservable();
  constructor(private http: HttpClient) {}

  getTimesheet(id: number): Observable<Timesheet> {
    return this.http.get<Timesheet>(this.baseUrl + 'timesheets/' + id);
  }
  add(timesheet: Timesheet) {
    return this.http.post(this.baseUrl + 'timesheets/add', timesheet);
  }

  update(timesheet: Timesheet) {
    console.log('timesheet form timesheet service: ', timesheet);
    return this.http.put(this.baseUrl + 'timesheets/put', timesheet);
  }
  passTimesheet(viewTS: Timesheet) {
    this.timesheetToBePassed.next(viewTS);
  }
}
