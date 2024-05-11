import { Observable, of } from "rxjs";
import { environment } from "../environment/environment";

/**
 * Base service providing common functionalities for services interacting with APIs.
 * For example, it includes the base URL of the API and a method for handling HTTP errors.
 */
export default class BaseService {

  /**
   * The base URL of the API, including the version prefix and ending with a trailing slash.
   * It is derived from the environment configuration.
   * No need to add extra slashes when using it for API endpoints.
   */
  protected baseUrl = environment.apiUrl;

  /**
   * Handles HTTP errors.
   * Logs the error to the console and allows the application to continue running.
   * @param operation - The name of the operation that failed.
   * @param result - An optional value to return as the observable result.
   * @returns A function to handle the error and return the specified result.
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: A better way is to send the error to remote logging infrastructure or save it in a log file
      console.error(`${operation} failed: ${error.message}`, error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
