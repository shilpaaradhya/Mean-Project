import { Component, OnInit } from '@angular/core';
import { AppService} from '../app.service';
import { AuthService } from '../auth/auth.service'
import { SpinnerService } from '../shared/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _as: AppService , private auth : AuthService , private spinner: SpinnerService ) { }

  displayItems  = [];
  notifications = [];
  length : any = [ ]
  postperpage = 2;

  ngOnInit(): void {
    this.getApiData();
  }

  getApiData(){
    this._as.getData( this.postperpage , 1).
    subscribe((response : any) =>
    {
      this.displayItems= response.message;
      console.log( 'response from API' ,response.message)
      this.getNotify();
      this.spinner.requestEnded();
    }), (error) => {
      console.log( 'error is' , error)
      this.spinner.requestEnded();
    }
  }

  getNotify(){
    this._as.getNotify( ).
    subscribe((response : any) =>
    {
      this.notifications= response.message;
     this.length = [{ n : this.notifications.length}]
      console.log( 'response from API',response.message)
      this.spinner.requestEnded();
    }), (error) => {
      console.log( 'error is' , error)
      this.spinner.requestEnded();
    }
  }

  

  onlogout(){
    this.auth.logout()
  }
}
