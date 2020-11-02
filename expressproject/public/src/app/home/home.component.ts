import { Component, OnInit } from '@angular/core';
import { AppService} from '../app.service';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _as: AppService , private auth : AuthService ) { }

  displayItems  = [];

  postperpage = 2;

  ngOnInit(): void {
    this.getApiData();
  }

  getApiData(){
    this._as.getData( this.postperpage , 1).
    subscribe((response : any) =>
    {
      this.displayItems= response.message
      console.log( 'response from API' ,response)
    }), (error) => {
      console.log( 'error is' , error)
    }
  }

  onlogout(){
    this.auth.logout()
  }
}
