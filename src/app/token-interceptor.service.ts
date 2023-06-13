import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { CommonService } from './Services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }


  bearerGenerate(){
    let currentToken = "Bearer ";
    return new Promise(resolve=> {
      setTimeout(()=>{
        let commonService = this.injector.get(CommonService);
        currentToken+=commonService.getToken();

        console.log(currentToken)
        resolve(currentToken);
      },200);
    })
  }


  intercept(req: any, next: any) {
    let tokenizedReq
    this.bearerGenerate().then(res=> {
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: res
        }
      })
    })
    return next.handle(tokenizedReq)
  }
}
