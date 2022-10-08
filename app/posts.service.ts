import { Post } from "./post.model";
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // angular httpclient will convert the data to json data
    // if u not subscribing to a request angular kmows that no one interseted in aresponse
    // if the component doesn't care about the data  , not subscribe in component , no problem to subscribe in a service
    this.http
      .post<{ name: string }>( // the response data types <here>returned value name:-NBlqzDiacZ1PPvkj4Ua
        "https://angular-max-http-9dec2-default-rtdb.firebaseio.com/posts.json",
        postData,
        //  {observe: "response" } : means to get the row response data not the body object
        { observe: "response" }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://angular-max-http-9dec2-default-rtdb.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({ "custom-header": "amr" }),
          params: new HttpParams()
            .append("print", "pretty")
            .append("custom", "amr"), //result: https://angular-max-http-9dec2-default-rtdb.firebaseio.com/posts.json?print=pretty&custom=amr
          responseType: "json", // default type
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (Object.prototype.hasOwnProperty.call(responseData, key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          // send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        "https://angular-max-http-9dec2-default-rtdb.firebaseio.com/posts.json",
        { observe: "events", responseType: "text" }
      )
      .pipe(
        // tap : do somthing woth response but not disturbe subjscrobe fn
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            // update Ui or inform  user that response sent
          }
          if (event.type === HttpEventType.Response) console.log(event.body);
        })
      );
  }
}
