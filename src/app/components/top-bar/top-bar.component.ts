import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {

  constructor(private router: Router) {}

  goToCreatePost() {
    this.router.navigate(['add-post']);
  }
}
