import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // mainApiUrl: string = environment.API_Url
  mainApiUrl = "http://localhost:3000/photos"

  constructor(
    private http: HttpClient
  ) { }

  getPhotos(){
    return this.http.get(this.mainApiUrl);
  }

  postPhotos(photos: any) {
    console.log(photos)
    return this.http.post(this.mainApiUrl, photos)
  }
}
