import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  expireddiv: Boolean = false;
  errdiv: boolean;
  errMsg: string = "";

  ngOnInit() {
  
  }
  constructor( private auth: AuthService , private r: Router ) { }
  login() {
      console.log(this.user);
      this.auth.login(this.user.email , this.user.password);
    }

    Signup(){
      this.r.navigate(['/signup'])
    }

}
