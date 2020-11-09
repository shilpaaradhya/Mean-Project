import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateuserComponent } from './createuser.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


const ROUTES:Routes=[{ path: '', component: CreateuserComponent}];

@NgModule({
  declarations: [CreateuserComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES) ,
  ]
})
export class CreateuserModule { }
