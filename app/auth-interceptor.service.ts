import { tap } from "rxjs/operators";
import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  // intercepor acte before the request leaves app and befor the response forward to subscribe
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("request on its way");
    const modifiedRequest = req.clone({
      headers: req.headers.append("auth", "xyz"),
    }); // becuase request is imutable

    // let the request continue ot journy
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log("response arrived boody data ");
          console.log(event.body);
          
        }
      })
    );
  }
}
