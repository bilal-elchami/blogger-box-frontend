import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import { PostCreateInput } from '../../data/post';
import { PostService } from '../../services/post.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
})
export class PostCreationComponent implements OnInit {

  postForm!: FormGroup;
  categories: Category[] = [];

  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Get all the categories to populate the dropdown list
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
    // Create the form group with the desired validations
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      category: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.postForm.valid) {
      // The form is valid,
      // Prepare the post creation object to be sent to the backend
      const newPost: PostCreateInput = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        categoryId: this.postForm.value.category,
      };
      // Send the post instance to the backend and subscribe to the response
      // in order to close the modal
      this.postService.create(newPost).subscribe((res) => {
        this.toastService.showToast("Post Submitted Successfully", "success");
        this.goToHomePage();
      });
    } else {
      // Show an error toast when the form is not valid
      this.toastService.showToast("Please review your post", "error");
    }
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

  public get title(): AbstractControl | null {
    return this.postForm.get('title');
  }

  public get category(): AbstractControl | null {
    return this.postForm.get('category');
  }

  public get content(): AbstractControl | null {
    return this.postForm.get('content');
  }
}
