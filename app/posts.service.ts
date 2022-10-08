import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // angular httpclient will convert the data to json data
    // if u not subscribing to a request angular kmows that no one interseted in aresponse
    // if the component doesn't care about the data  , not subscribe in component , no problem to subscribe in a service
    this.http
      .post<{ name: string }>( // the response data types <here>returned value name:-NBlqzDiacZ1PPvkj4Ua
        "https://angular-max-http-9dec2-default-rtdb.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://angular-max-http-9dec2-default-rtdb.firebaseio.com/posts.json"
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
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      "https://angular-max-http-9dec2-default-rtdb.firebaseio.com/posts.json"
    );
  }
}
