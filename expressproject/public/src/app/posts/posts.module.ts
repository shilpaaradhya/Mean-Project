import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule} from "@angular/material/paginator"

const ROUTES:Routes=[{ path: '', component: PostsComponent}];

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES) ,
    MatPaginatorModule
  ]
})
export class PostsModule { }
