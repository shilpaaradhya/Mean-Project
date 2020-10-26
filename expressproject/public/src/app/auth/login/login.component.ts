import { Component, OnInit } from '@angular/core';
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
    // if (this.activatedRoute.snapshot.queryParams["emsg"] == "session Expired") {
    //   this.expireddiv = true;
    // } else {
    //   this.expireddiv = false;
    //}
  }
  constructor( private auth: AuthService) { }
  login() {
    // this._as.showOrHideLoader(true)
    // this._as.login(this.user).subscribe((res: any) => {
    //   this.errdiv = false;
    //   localStorage.setItem("token", res.token);
    //   this._as.setUserDetails();
    //   // this.adminSer.setUserDetails(res);
    //   // this.jmsSer.setUserDetails(res);
    //   if (this._as.userDetails.role == "admin") {
    //     this.r.navigate(['/admin-dashboard']);
    //   }
    //   else if (this._as.userDetails.role == 'user') {
    //     this.r.navigate(['/dashboard']);
    //   }
    //   else if (this._as.userDetails.role == 'super-admin') {
    //     this.r.navigate(['/super-admin-dashboard']);
    //   }
  //  },
      // error => {
      //   this.errdiv = true;
      //   this.expireddiv = false;
      //   this._as.showOrHideLoader(false);
      //   if (error.error.message == "Username does not exits") {
      //     this.errMsg = "Incorrect Username";
      //   }
      //   if (error.error.message == "username and password does not match") {
      //     this.errMsg = "Invalid Credentials";
      //   }
      //   if (error.error.message == "Database connection is not established") {
      //     this.errMsg = "Database Connection is not Established";
      //   }
      //   console.log(error);
      // });

      console.log(this.user);
      this.auth.login(this.user.email , this.user.password);

    }

    
}
