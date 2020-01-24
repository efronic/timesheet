import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deletiondialog',
  templateUrl: './deletiondialog.component.html',
  styleUrls: ['./deletiondialog.component.scss']
})
export class DeletiondialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  onNoClick(): void {
    this.data.response = 'false';
    this.dialogRef.close();
  }
}
