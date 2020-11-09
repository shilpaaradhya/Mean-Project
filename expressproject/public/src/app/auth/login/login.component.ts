import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
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
  constructor( private auth: AuthService , private r: Router , private _as: AppService ) { }

  login() {
      console.log(this.user);
      this.auth.login(this.user.email , this.user.password );
    }

    Signup(){
      this.r.navigate(['/signup'])
    }

}
