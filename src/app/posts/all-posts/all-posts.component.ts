import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {

onFeatured(id: string, value : boolean) {
  const featuredData = {
    isFeatured: value
  }
  this.postService.markFeatured(id, featuredData);
}

onDelete(postImagePath: string,id: string) {
    this.postService.deleteImage(postImagePath, id);
}

  postArray: Array<any>  = new Array<any>;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
        this.postService.loadData().subscribe(value => {
      this.postArray = value;
    });
  }
}
