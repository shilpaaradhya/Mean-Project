import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = {};
 role = { role: "user"}

  ngOnInit() {
  }
  constructor( private auth: AuthService ,  private r: Router) { }
  SignUp() {
      console.log(this.user);
      this.auth.createUser(this.user.email , this.user.password , this.role.role) ;
      this.r.navigate(['/login'])
    }

    Login(){
      this.r.navigate(['/login'])
    }
}
