import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";
import { Post, PostCreateInput } from "../data/post";
import { Injectable } from "@angular/core";

import BaseService from "./base.service";

/**
 * Service for managing operations related to posts.
 * This service handles CRUD operations for posts, including fetching, creating, updating, and deleting posts.
 * It provides methods to interact with the server-side API for posts.
 */
@Injectable()
export class PostService extends BaseService {

  private postsUrl = `${this.baseUrl}v1/posts`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Fetches all posts from the server.
   * @returns An Observable emitting an array of Post objects.
   */
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        map((posts) => {
          posts.forEach((post) => (post.createdDate = new Date()));
          return posts;
        }),
        catchError(this.handleError<Post[]>('getAll', []))
      );
  }

  /**
   * Fetches posts that contain a certain text in their title or content.
   * @param text - The text to search for in the posts.
   * @returns An Observable emitting an array of Post objects matching the search criteria.
   */
  getLikeName(text: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}?value=${text}`)
      .pipe(
        catchError(this.handleError<Post[]>('getLikeName', []))
      );
  }

  /**
   * Fetches a single post by its ID.
   * @param id - The ID of the post to fetch.
   * @returns An Observable emitting a single Post object.
   */
  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Post>('getById', undefined))
      );
  }

  /**
   * Updates an existing post.
   * @param post - The updated Post object.
   * @returns An Observable emitting the updated Post object.
   */
  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postsUrl}/${post.id}`, post)
      .pipe(
        catchError(this.handleError<Post>('update', post))
      );
  }

  /**
   * Deletes a post.
   * @param post - The Post object to delete.
   * @returns An Observable emitting a boolean value indicating whether the deletion was successful.
   */
  delete(post: Post): Observable<boolean> {
    return this.http.delete<boolean>(`${this.postsUrl}/${post.id}`)
      .pipe(
        catchError(this.handleError<boolean>('delete', false))
      );
  }

  /**
   * Creates a new post.
   * @param post - The PostCreateInput object containing the data for the new post.
   * @returns An Observable emitting the created Post object.
   */
  create(post: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post)
      .pipe(
        catchError(this.handleError<Post>('create', undefined))
      );
  }
}
