import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient
  ) { }

  getPhotos(param: string){
    const currentUrl = this.connectionUrl + param
    return this.http.get(currentUrl);
  }

  verification(data: string){
    return this.http.post(environment.LoginVerify, data);
  }

  postPhotos(photos: any, param: string) {
    const currentUrl = this.connectionUrl + param
    console.log(photos)
    return this.http.post(currentUrl, photos)
  }
}
