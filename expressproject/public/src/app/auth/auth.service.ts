import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthData } from './auth-data.model'
import { Router } from '@angular/router';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : string

  constructor(  private http :HttpClient , private router : Router ) { }


  

  createUser( email: string , password : string ) {

   const  authData : AuthData = { email: email , password: password }
    this.http.post("/users/signup" , authData).subscribe( response => {
      console.log(response);
      this.router.navigate(['/login'])
    })
    
    }
    
    login( email: string , password : string ) {
      const  authData : AuthData = { email: email , password: password }
       this.http.post<{ token : string}>("/users/login" , authData).subscribe( response => {
        const token = response.token
        this.token = token;
         console.log(response);
         localStorage.setItem( 'token' , this.token)
         this.router.navigate(['/posts'])

       })
       }

       loggedIn(){
         console.log(this.token)
          return this.token;
       }

       logout(){
       this.token = null
        this.router.navigate(['/login'])
       } 
}
