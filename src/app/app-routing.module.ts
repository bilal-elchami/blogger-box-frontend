import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreationComponent } from './components/post-creation/post-creation.component';

const routes: Routes = [
  { path: '' , component: PostListComponent },
  { path: 'add-post' , component: PostCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
