import { Component, OnInit } from '@angular/core';
import { Post } from '../../data/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  constructor(private postService: PostService) {}

  posts: Post[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts
    })
  }

}
