import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Comment } from '../comment.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: any;
  @Input() currentUser: any;

  public showCommentBox = false;
  public editMode = false;
  public replyToUsername = '';

  @Output() commentEdit = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  calculateCreatedAt = (date: Date) => {
    let difference;
    const duration = moment.duration(moment().diff(date));
    const totalNumberOfDays = parseInt(duration.asDays().toFixed(0));
    const days = duration.days();
    const months = duration.months();
    if (totalNumberOfDays < 2) {
      difference = `${days} day ago`
    } else if (totalNumberOfDays < 31) {
      difference = `${days} days ago`
    } else if (totalNumberOfDays > 30 && totalNumberOfDays < 61) {
      difference = `${months} month and ${days} days ago`
    }
    else if (totalNumberOfDays > 60 && totalNumberOfDays < 366) {
      difference = `${months} months and ${days} days ago`
    }
    return difference;
  };

  onCommentBoxValueChange = (event: string, commentId: number, isEdit: boolean, username?: string) => {
    this.editMode = false;
    this.showCommentBox = false;
    this.commentEdit.next({ content: event, commentId, isEdit, username });
  };

  onReply = (username: string) => {
    this.replyToUsername = username;
    this.showCommentBox = !this.showCommentBox;
  };

  onEdit = () => this.editMode = !this.editMode;

  onDelete = (comment: Comment) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      data: { type: comment?.replyingTo ? 'Reply' : 'Comment' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentEdit.next({ delete: true, isEdit: true, commentId: comment.id })
      }
    });
  };

  upVote = (count: number, commentId: number) => this.commentEdit.next({ count, commentId, isEdit: true });

  downVote = (count: number, commentId: number) => this.commentEdit.next({ count, commentId, isEdit: true });

}
