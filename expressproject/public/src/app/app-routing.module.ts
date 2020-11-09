import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard} from './auth.guard'
import { PagenotfoundComponent } from './auth/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule) , canActivate:[ AuthGuard] }, 
  {path: 'signup', component: SignupComponent},
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(mod => mod.PostsModule) , canActivate:[ AuthGuard]}, 
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponent = [SignupComponent , LoginComponent , PagenotfoundComponent]