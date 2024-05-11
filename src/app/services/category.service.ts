import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Injectable } from "@angular/core";

import BaseService from "./base.service";
import { Category, CategoryCreateInput } from "../data/category";
import { Post } from "../data/post";

/**
 * Service for managing operations related to categories.
 * This service handles CRUD operations for categories, including fetching, creating, updating, and deleting categories.
 * It provides methods to interact with the server-side API for categories.
 */
@Injectable()
export class CategoryService extends BaseService {

  private categoriesUrl = `${this.baseUrl}v1/categories`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Fetches all categories from the server.
   * @returns An Observable emitting an array of Category objects.
   */
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        catchError(this.handleError<Category[]>('getAll', []))
      );
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
   * Fetches a single category by its ID.
   * @param id - The ID of the category to fetch.
   * @returns An Observable emitting a single Category object.
   */
  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Category>('getById', undefined))
      );
  }

  /**
   * Updates an existing category.
   * @param category - The updated Category object.
   * @returns An Observable emitting the updated Category object.
   */
  update(category: Category): Observable<Category> {
    return this.http.put<Category>(this.categoriesUrl, category)
      .pipe(
        catchError(this.handleError<Category>('getLikeName', category))
      );
  }

  /**
   * Deletes a category.
   * @param category - The Category object to delete.
   * @returns An Observable emitting a boolean value indicating whether the deletion was successful.
   */
  delete(category: Category): Observable<boolean> {
    return this.http.delete<boolean>(`${this.categoriesUrl}/${category.id}`)
      .pipe(
        catchError(this.handleError<boolean>('delete', false))
      );
  }

  /**
   * Creates a new category.
   * @param category - The CategoryCreateInput object containing the data for the new category.
   * @returns An Observable emitting the created Category object.
   */
  create(category: CategoryCreateInput): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category)
      .pipe(
        catchError(this.handleError<Category>('create', undefined))
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
