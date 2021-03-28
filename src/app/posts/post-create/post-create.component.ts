import { Component, OnInit } from '@angular/core';
//import { Post } from '../post.model';

import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(public PostsService: PostsService) {}

  ngOnInit(): void {}

  enteredTitle = '';
  enteredContent = '';
  /*  @Output() postCreated = new EventEmitter<Post>(); */

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    /* const post: Post = {
      title: form.value.title,
      content: form.value.content,
    }; */
    /* this.postCreated.emit(post); */
    this.PostsService.addPost(form.value.title, form.value.content);
    //clear form after adding post
    form.resetForm();
  }
}
