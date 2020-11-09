import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor( private http :HttpClient ) {  }
  getData( postPerPage : Number , currentPage : number){
    const queryParams  = `?pagesize=${postPerPage}& page=${currentPage}`
    return this.http.get ('/api/getData' + queryParams)
  }

  getNotify(){
    return this.http.get ('/api/getNotify')
  }
}

