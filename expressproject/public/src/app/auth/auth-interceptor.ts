import { HttpInterceptor , HttpRequest  , HttpHandler} from "@angular/Common/Http"
import { Injectable } from "@angular/core"
import { AuthService} from "./auth.service"

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    
    constructor ( private auth : AuthService){}
    intercept( req: HttpRequest<any> , next: HttpHandler ){
       const authToken : any = this.auth.getToken();
        const authRequest =  req.clone ({  headers: req.headers.set('authorization',  "Bearer" + authToken)
    })
        
     return next.handle(authRequest)
    }
}

