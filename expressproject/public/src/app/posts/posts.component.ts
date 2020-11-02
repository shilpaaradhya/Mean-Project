import { Component, OnInit } from '@angular/core';
import { AppService} from '../app.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppModule} from '../app.module'
import { PageEvent } from '@angular/material/paginator';

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
  pageSizeOptions = [ 2,4,6,8,10]
  constructor( private _as : AppService ,  private http :HttpClient ) { }

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
      // this.postArray = response
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
    }), (error) => {
      console.log( 'error is' , error)
    }
  }

  ondelete(postid : string){
    this.http.delete('/api/deleteData/' + postid).subscribe((response) =>
    {
      console.log( 'response from API' ,response)
    }), (error) => {
      console.log( 'error is' , error)
    }
    this.getApiData();
  }

  onChanepage( pageData : PageEvent){

  }

  onCancel(){

  }
}

