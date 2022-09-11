import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { throwError, catchError, Observable } from 'rxjs';

import { CloudSessionService } from './cloud-session.service';
@Injectable(/*{
  providedIn: 'root'
}*/)
export class ErrorHttpInterceptorService implements HttpInterceptor {

  constructor(private cloudSessionService : CloudSessionService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe<HttpEvent<any>>(catchError(this.handleError));
  };
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      if (error.status === 401) {
        this.cloudSessionService.disconnected();
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
