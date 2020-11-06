import { Component } from '@angular/core';
import{ AuthService} from './auth/auth.service'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'express';
  menuItems: any[];
  constructor(  private auth: AuthService ) { }

 
}
