import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  enteredValue : any = {};
  userDetails : any =[]

  constructor(  private r: Router , private auth: AuthService ) {  }

  ngOnInit(): void {
  
  }

  onSave(){
   console.log(this.enteredValue);
   this.auth.createUser(this.enteredValue.email , this.enteredValue.password , this.enteredValue.role);
  }

  onCancel(){
this.enteredValue = {}
  }

  onclick(){
    this.r.navigate(['/home'])
  }
}
