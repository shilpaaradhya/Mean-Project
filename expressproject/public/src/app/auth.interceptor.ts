import { HttpInterceptor , HttpRequest  , HttpHandler} from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AuthService } from './auth/auth.service'

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
     authToken :any;
    constructor ( private auth: AuthService ){}
    
    intercept( req: HttpRequest<any> , next: HttpHandler){

        if( ! this.auth.token){
            this.auth.token = localStorage.getItem("token");
        }
        const authRequest =  req.clone({  
            headers: req.headers.set( 'Authorization', this.auth.token)
        })
        
    return next.handle(authRequest)
    }
        
    
}

// constructor ( private auth : AuthService){}
//     intercept( req: HttpRequest<any> , next: HttpHandler ){
//         let authToken: any;
//         authToken = this.auth.getToken();
//         const authRequest =  req.clone ({  headers: req.headers.set("Authorization", authToken)
//     })
        
//      return next.handle(authRequest)