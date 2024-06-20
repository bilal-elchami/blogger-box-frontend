import { Observable, catchError } from "rxjs";
import { Injectable } from "@angular/core";

import { Category, CategoryCreateInput } from "../data/category";
import { Post } from "../data/post";
import BaseService from "./base.service";

/**
 * Service for managing operations related to categories.
 * This service handles CRUD operations for categories, including fetching, creating, updating, and deleting categories.
 * It provides methods to interact with the server-side API for categories.
 */
@Injectable()
export class CategoryService extends BaseService<Category, CategoryCreateInput> {

  private categoriesUrl = `${this.baseUrl}v1/categories`;

  override getEndpointUrl(): string {
    return this.categoriesUrl;
  }

  /**
   * Fetches categories that contain a certain text in their name.
   * @param text - The text to search for in the category names.
   * @returns An Observable emitting an array of Category objects matching the search criteria.
   */
  getLikeName(text: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoriesUrl}/name=${text}`)
      .pipe(
        catchError(this.handleError<Category[]>('getLikeName', []))
      );
  }

  /**
   * Fetches posts related to a specific category by its ID.
   * @param categoryId - The ID of the category to fetch related posts for.
   * @returns An Observable emitting an array of Post objects related to the specified category.
   */
  getRelatedPostsByCategoryId(categoryId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.categoriesUrl}/${categoryId}/posts`)
      .pipe(
        catchError(this.handleError<Post[]>('getRelatedPosts', []))
      );
  }
}
