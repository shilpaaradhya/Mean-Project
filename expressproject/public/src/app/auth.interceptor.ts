import { HttpInterceptor , HttpRequest  , HttpHandler, HttpResponse, HttpErrorResponse , HttpEvent} from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AuthService } from './auth/auth.service'
import { SpinnerService } from './shared/spinner.service'
import { Observable, throwError } from "rxjs";
import { map, retry, catchError } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
     authToken :any;
    constructor ( private auth: AuthService , private spinner: SpinnerService){}
    
    intercept( req: HttpRequest<any> , next: HttpHandler){
       this.spinner.requestStarted();
        if( ! this.auth.token){
            this.auth.token = localStorage.getItem("token");
        }

        if (req.url.includes("/login") ) {
            return next.handle(req);
        }
       
        const authRequest =  req.clone({  headers: req.headers.set( 'Authorization', this.auth.token)});
        return next.handle(authRequest).pipe(
        map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (event.headers.get('Authorization')) {
                            this.auth.token = event.headers.get('Authorization');
                            localStorage.setItem("token", event.headers.get('Authorization'));
                        }
                        this.spinner.requestEnded();
                    }
                    return event
                }),
                
                catchError(this.handleError)
                
            )
         
    }
       
    private handleError(error: Response) {
       

        if (error.status == 403) {
            localStorage.clear();
            window.location.href = "login?emsg=session Expired";
           
        }
        else {
            return throwError(error || 'Server error');
        }
     
    }

}

