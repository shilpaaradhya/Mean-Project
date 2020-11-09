import { Component, OnInit } from '@angular/core';
import { AppService} from '../app.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppModule} from '../app.module'
import { PageEvent } from '@angular/material/paginator';
import { SpinnerService } from '../shared/spinner.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  enteredValue : any = {};
  postArray : any =[]
  totalPosts = 10;
  postperpage = 5;
  pageSizeOptions = [ 2,4,6,8,10];
  newNotification : any = {}
  constructor( private _as : AppService ,  private http :HttpClient , private spinner: SpinnerService , private auth : AuthService ) { }

  ngOnInit() {
    this.getApiData();
  }


  onSave(){
    this.postArray.push(this.enteredValue)
    this.postData();
    this.getApiData();
    this.enteredValue={}
  }

  postData(){
    return this.http.post ('/api/postData', this.enteredValue
    ).subscribe((response) =>
    {
      console.log( 'response from API' ,response)
      this.newNotification = {message: "created New Post"}
      this.notifyData();
    }), (error) => {
      console.log( 'error is' , error)
      
    }
    
  }

  notifyData(){
    return this.http.post ('/api/notifyData', this.newNotification
    ).subscribe((response) =>
    {
      console.log( 'response from API' ,response)
      
    }), (error) => {
      console.log( 'error is' , error)
    }
  }

  getApiData(){
    this._as.getData( this.postperpage , 1).
    subscribe((response : any) =>
    {
      this.postArray = response.message
      console.log( 'response from API' ,response)
      this.spinner.requestEnded();
    }), (error) => {
      console.log( 'error is' , error)
      this.spinner.requestEnded();
    }
  }

  ondelete(postid : string){
    this.http.delete('/api/deleteData/' + postid).subscribe((response) =>
    {
      console.log( 'response from API' ,response)
      this.newNotification = { message:"Deleted a Post"};
      this.notifyData()
    }), (error) => {
      console.log( 'error is' , error)
    }
    this.getApiData();
  }

  onChanepage( pageData : PageEvent){

  }

  onCancel(){
    this.enteredValue={}
  }


  onlogout(){
this.auth.logout()
  }
}

