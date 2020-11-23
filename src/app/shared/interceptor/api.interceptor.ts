import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilityService } from '../services/utility.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private utility: UtilityService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    return next.handle(request).pipe(
      tap(
        (ev: HttpEvent<any>) => {
          // TODO: manipulate data here
          if (ev instanceof HttpErrorResponse) {
            // Handle 401 here
            console.log('No authorisarion');
          }
        }
      )
    );
  }
}
