import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  public type = 'Comment'
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data?.type;
    console.log('🚀 ~ file: delete-dialog.component.ts ~ line 16 ~ this.type', this.type)
  }

  ngOnInit() {
  }

  onNoClick = () => this.dialogRef.close();

}
