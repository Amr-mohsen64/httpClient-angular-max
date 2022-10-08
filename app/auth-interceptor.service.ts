import {
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

    return next.handle(modifiedRequest); // let the request continue ot journy
  }
}
