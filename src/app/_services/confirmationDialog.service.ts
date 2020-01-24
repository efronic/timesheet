import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { map, first } from 'rxjs/operators';
import { DeletiondialogComponent } from '../_helpers/deletiondialog/deletiondialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  confirm(
    message?: string,
    header?: string,
    comments?: string
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(DeletiondialogComponent, {
      width: '30%',
      data: {
        warningMessage: message,
        headerMessage: header
        // ,deletionComments: comments
      }
    });
    return dialogRef.afterClosed().pipe(
      map(result => {
        console.log('result from dialogservice: ', result);
        return result;
      }),
      first()
    );
  }
  constructor(public dialog: MatDialog) {}
}
