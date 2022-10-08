import { tap } from "rxjs/operators";
import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

export class LoggingInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("outging request from logging interceptor");
    console.log(req.url);
    console.log(req.headers);

    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("incoming response ");
          console.log(event.body);
        }
      })
    );
  }
}
