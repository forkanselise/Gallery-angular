import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../Services/common.service';
import { ImgbbService } from '../Services/imgbb.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  PhotoInfo = this.fb.group({
    Name: [''],
    Image: [''],
  });

  readyForUploadItems: any[] = [];

  isLoading: boolean = false;
  cnt = 0;

  databaseCollection: string = 'photos'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogboxComponent>,
    private fb: FormBuilder,
    private commonService: CommonService,
    private imgbbService: ImgbbService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.isWedding){
      this.databaseCollection='wedding-photos'
    }
    console.log(this.databaseCollection)
  }

  public picked(event:any) {
    // this.currentId = field;
    this.readyForUploadItems.splice(0);
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      // const file: File = fileList[0];
      // this.sellersPermitFile = file;
      for(let i=0; i<fileList.length; i++) {
        const file: File = fileList[i];
        this.handleInputChange(file);
      }
      // this.handleInputChange(file); //turn into base64
      console.log(this.readyForUploadItems)

    }
  }

  uploadToImgbb(data: any){

    let responseObject: any;

    this.imgbbService.uploadImage(data.Image).subscribe(res => {
      console.log("Upload Response = ", res);

      if(res){
        responseObject = res;
        console.log(data)
        data['Image'] = (responseObject.data.url)
        data['Name'] = responseObject.data.image.filename;
        console.log("Data before post in mongodb  = ",data)
        this.commonService.postPhotos(data,this.databaseCollection).subscribe()
      }
      // this.commonService.postPhotos(res?.Data).subscribe()
    })
  }

  handleInputChange(files:any) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e:any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    // let id = this.currentId;
    this.cnt++;
    // console.log(this.cnt," = ",base64result);

    this.PhotoInfo.get('Image')?.setValue(base64result);

    this.readyForUploadItems.push(this.PhotoInfo.value);

    // this.log();
  }




  uploadNow() {
    this.isLoading = true;

    this.readyForUploadItems.forEach(res => {
      // this.commonService.postPhotos(res).subscribe()
      this.uploadToImgbb(res)
      console.log(res)
    })
    this.isLoading=false;
  }

}
