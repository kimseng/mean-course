import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public PostsService: PostsService) {}

  ngOnInit(): void {
    //this.posts = this.PostsService.getPosts();
    this.isLoading = true;
    this.PostsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.PostsService.getPostUpdateListener().subscribe(
      (postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      }
    );
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;

    this.PostsService.getPosts(this.postsPerPage, this.currentPage);
  }
  //AFter delete, get post based on condition postPerPage and currentPage
  onDelete(postId: string) {
    this.isLoading = true;
    this.PostsService.deletePost(postId).subscribe(() => {
      this.PostsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  /* posts
  = [
    { title: 'First Post', content: "This is the first post's content" },
    { title: 'Second Post', content: "This is the second post's content" },
    { title: 'Third Post', content: "This is the third post's content" },
  ]; */
}
