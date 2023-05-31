import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {




  Uploadheader = new HttpHeaders ({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  cloudName = new Cloudinary({
    cloud: {
      cloudName: "dnt43ugtr"
    }
  });

  img!: CloudinaryImage;

  constructor(private http: HttpClient) {
  }

  UploadImage(data: File){
    console.log(data);
    let formData = new FormData();

    // for(let i=0; i < data.length; i++){

    formData.append('api_key',environment.cloudinary_api_key);
    formData.append('upload_preset',environment.upload_preset);
    formData.append('file',data);

    // }

    return this.http.post(environment.cloudinaryApi,formData)

    // console.log(this.uploadPayload)

  }

}
