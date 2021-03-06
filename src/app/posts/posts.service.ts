import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  constructor(private http: HttpClient, private router: Router) {}

  /**${param} called dynamic value injection */
  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPostData) => {
        //console.log(transformedPostData);

        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts,
        });
      });
    console.log(this.posts);

    //return this.posts;
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
    /* return { ...this.posts.find((p) => p.id === id) }; */
  }

  addPost(title: string, content: string, image: File) {
    /* const post: Post = {
      id: null,
      title: title,
      content: content,
    }; */
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http
      .post<{ message: string; post: Post }>(BACKEND_URL, postData)
      .subscribe((responseData) => {
        /**Redirect to post list */
        this.router.navigate(['/']);
        //console.log(responseData.message);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    /**Why image has two type (image and String) because sometimes it is image or its path */
    /* const post: Post = {
      id: id,
      title: title,
      content: content,
      imagePath: null,
    }; */
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id); //key to update existing record
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
      console.log(postData);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null,
      };
    }
    this.http.put(BACKEND_URL + id, postData).subscribe((response) => {
      this.router.navigate(['/']);
    });
    console.log(this.posts);
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
