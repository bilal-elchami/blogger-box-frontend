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
export class PostService extends BaseService<Post, PostCreateInput> {

  private postsUrl = `${this.baseUrl}v1/posts`;

  override getEndpointUrl(): string {
    return this.postsUrl;
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
}
