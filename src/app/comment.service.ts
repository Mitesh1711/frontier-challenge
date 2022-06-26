import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  replies?: Comment[],
  user: User;
}

export interface User {
  image: { png: string };
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getAllComments = () => this.http.get("./assets/data.json");

}
