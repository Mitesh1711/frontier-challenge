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
    console.log('🚀 ~ file: comment-card.component.ts ~ line 12 ~ comment', this.comment)
    console.log('🚀 ~ file: comment-card.component.ts ~ line 12 ~ comment', this.currentUser)
  }

  calculateCreatedAt = (date: Date) => {
    const duration = moment.duration(moment().diff(date));
    const days = duration.asDays().toFixed(0);
    return `${days} days ago`;
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
