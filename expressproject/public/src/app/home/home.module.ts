import { NgModule } from '@angular/core';
import { HomeRoutingModule , routingComponents} from './home-routing.module'
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common'

@NgModule({
  declarations: 
    routingComponents,
  imports: [
    HomeRoutingModule,
    FormsModule,
    CommonModule
  ]
})
export class HomeModule { }
