import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { POSTS, Post } from "../data/post";
import { Injectable } from "@angular/core";

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }

}
