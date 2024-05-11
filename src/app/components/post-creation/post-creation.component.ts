import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import { PostCreateInput } from '../../data/post';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2'

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
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Post Submitted Successfully"
        });
        this.goToHomePage();
      });
    } else {
      // Show an error toast when the form is not valid
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Please review your post"
      });
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
