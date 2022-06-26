import { Component } from '@angular/core';
import * as moment from 'moment';
import { Comment, CommentService, User } from './comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Frontier App By Mitesh Patel';

  public comments: any;
  public currentUser: any;

  constructor(private commentsService: CommentService) {
    this.getCommentsFromLocalStorage();
    if (!this.currentUser) this.getAllComments();
    this.comments.sort((a: Comment, b: Comment) => (a.score < b.score) ? 1 : -1);
  }

  getAllComments = () => {
    this.commentsService.getAllComments().subscribe((res: any) => {
      this.comments = res?.comments;
      this.currentUser = res?.currentUser;
      this.setCommentsToLocalStorage(this.comments);
      this.setUserToLocalStorage(this.currentUser);
    });
  };

  getCommentsFromLocalStorage = () => {
    const localComments = localStorage.getItem('comments');
    const localUser = localStorage.getItem('currentUser');
    this.comments = localComments ? JSON.parse(localComments) : null;
    this.currentUser = localUser ? JSON.parse(localUser) : null;
  };

  setCommentsToLocalStorage = (comments: Comment[]) =>
    localStorage.setItem('comments', JSON.stringify(comments));

  setUserToLocalStorage = (currentUser?: User) =>
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

  onNewComment = (event: string) => {
    const newComment: Comment = {
      id: Math.floor(Math.random() * 5000),
      content: event,
      user: this.currentUser,
      score: 0,
      createdAt: moment().toISOString(),
      replies: []
    }
    this.comments.push(newComment);
    this.setCommentsToLocalStorage(this.comments);
  }

  onCommentEdit = (event: any) => {
    const index = this.comments.map((x: any) => x.id).indexOf(event.commentId)
    if (event?.isEdit) {
      if (index > -1) {
        if (event.content) this.comments.map((x: any) => x.content = x.id === event.commentId ? event.content : x.content)
        if (event.count) this.comments.map((x: any) => x.score = x.id === event.commentId ? x.score + event.count : x.score)
        if (event.delete) this.comments.splice(index, 1)
      } else {
        for (let comment of this.comments) {
          if (comment.replies.length > 0) {
            const replyIndex = comment.replies.map((x: any) => x.id).indexOf(event.commentId)
            if (replyIndex > -1) {
              comment.replies.map((x: any) => {
                x.content = x.id === event.commentId && event.content ? event.content : x.content;
                x.score = x.id === event.commentId && event.count ? x.score + event.count : x.score;
              })
              if (event.delete) comment.replies.splice(index, 1)
            }
          }
        }
      }
    } else {
      const reply: Comment = {
        id: Math.floor(Math.random() * 5000),
        content: event.content,
        user: this.currentUser,
        score: 0,
        createdAt: moment().toISOString(),
        replyingTo: event?.username
      }
      if (index > -1) {
        this.comments.map((x: any) => {
          if (x.id === event.commentId) x.replies.push(reply);
        })
      } else {
        for (let comment of this.comments) {
          if (comment.replies.length > 0) {
            const replyIndex = comment.replies.map((x: any) => x.id).indexOf(event.commentId)
            if (replyIndex > -1) {
              comment.replies.push(reply)
            }
          }
        }
      }
    }
    this.setCommentsToLocalStorage(this.comments)
  };
}
