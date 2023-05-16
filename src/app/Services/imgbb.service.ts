import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {

  private readonly imgbbApi = "https://api.imgbb.com/1/upload?expiration=600000&key=f74935e42933d6604c4bba6bb06244b4";

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(base64image: string){

    let key = 'image';
    let value = base64image;

    let payload = new URLSearchParams();
    payload.append(key, value);

    console.log(payload)

    const Uploadheader = new HttpHeaders ({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    console.log("imgValue = ", payload)
    return this.http.post(this.imgbbApi, payload ,{headers: Uploadheader})
  }

}
