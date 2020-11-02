import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authHandler : any
  constructor( private auth: AuthService , private router:Router){}
  
  canActivate(): boolean{
  this.authHandler =  this.auth.loggedIn();
if(this.authHandler != null || this.authHandler != undefined){
  console.log(this.authHandler)
  return true
} else{
  this.router.navigate(['/login']);
  alert('you must be logged in')
  return false
}
  }
}
