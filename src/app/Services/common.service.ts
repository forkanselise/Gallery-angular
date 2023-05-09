import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  mainApiUrl: string = environment.API_Url

  constructor(
    private http: HttpClient
  ) { }

  getPhotos(){
    return this.http.get(this.mainApiUrl);
  }

  postPhotos(photos: any) {
    return this.http.post(this.mainApiUrl, photos)
  }
}
