import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // connectionUrl = "http://localhost:3000/"
  connectionUrl = environment.API_Url
  // mainApiUrl: string = environment.API_Url
  mainApiUrl = "http://localhost:3000/photos"

  loginVerify = "http://localhost:3000/login"

  registration = "http://localhost:3000/register"

  constructor(
    private http: HttpClient
  ) { }

  getPhotos(param: string){
    const currentUrl = this.connectionUrl + param +"lul"
    return this.http.get(currentUrl);
  }

  loggedIn(){
    // let hasToken = document.cookie.includes('Authorization')
    if(document.cookie.length> 15){
      console.log(document.cookie)
      return true;
    }
    // else
    return false;
  }

  getCookie(name='auth/url'): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    console.log(parts[1])
    return parts[1];
    // if (parts.length === 2) return parts.pop().split(';').shift();
  }
  getToken(): string {
    let token = this.getCookie();
    return token;
    // return document.cookie.valueOf('auth/url')
  }

  verification(data: any){
    console.log(data)
    const verify = this.http.post(this.loginVerify, data);
    return verify;
  }

  registerUser(userInfo: any) {
    return this.http.post(this.registration, userInfo);
  }

  postPhotos(photos: any, param: string) {
    const currentUrl = this.connectionUrl + param
    console.log(photos)
    return this.http.post(currentUrl, photos)
  }
}
