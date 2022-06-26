import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  // @ViewChildren('textarea') textarea: ElementRef | undefined;

  @Input() buttonText = 'Comment';
  @Input() content = '';
  @Input() label = 'Add New Comment'
  @Input() replyToUsername = '';
  public newComment: FormControl = new FormControl('', Validators.required);

  @Output() commentBoxValue = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (this.replyToUsername) {
      this.newComment.setValue(`@${this.replyToUsername} `);
      this.renderer?.selectRootElement('textarea').focus();
    } else {
      this.newComment.setValue(this.content);
    }
  }

  onClick = () => {
    if (this.newComment.valid) {
      this.commentBoxValue.next(this.newComment.value);
      this.newComment.reset();
    }
  };
}
