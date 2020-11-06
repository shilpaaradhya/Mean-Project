import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthData } from './auth-data.model'
import { Router } from '@angular/router';
import { AppService} from '../app.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : string;
  isLoading : boolean = false;
   userId :string;

  constructor(  private http :HttpClient , private router : Router , private _as: AppService ) { }


  createUser( email: string , password : string ) {

   const  authData : AuthData = { email: email , password: password }
    this.http.post("/users/signup" , authData).subscribe( response => {
      console.log(response);
      this.router.navigate(['/login'])
    })
    
    }

    getUserId(){
      const userId = localStorage.getItem('userId')
      return userId
    }
    
    login( email: string , password : string ) {
      const  authData : AuthData = { email: email , password: password }
       this.http.post<{ token : string , userId : string}>("/users/login" , authData).subscribe( response => {
        const token = response.token
        this.token = token;
        this.userId = response.userId
         console.log(response);
         localStorage.setItem( 'token' , this.token)
         this.router.navigate(['/home']);
         localStorage.setItem('userId' , this.userId)
       })
       }

       loggedIn(){
         const token = localStorage.getItem('token')
          return token;
       }

       logout(){
       this.token = null;
       this.userId = null;
        this.router.navigate(['/login'])
       } 
}
