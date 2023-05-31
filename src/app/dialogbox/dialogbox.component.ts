import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../Services/common.service';
import { ImgbbService } from '../Services/imgbb.service';
import { Inject } from '@angular/core';
import { CloudinaryService } from '../Services/cloudinary.service';
import { combineLatest, forkJoin } from 'rxjs';

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

  buttonDisable: boolean = false;

  numberofPhotos: number = 0;
  fileList: File[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogboxComponent>,
    private fb: FormBuilder,
    private commonService: CommonService,
    private imgbbService: ImgbbService,
    private cloudinaryService: CloudinaryService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.isWedding){
      this.databaseCollection='wedding-photos'
    }
    console.log(this.databaseCollection)
  }

  public picked(event: any) {
    // this.currentId = field;
    // this.isLoading = true;
    this.readyForUploadItems.splice(0);
    this.fileList.splice(0)
    this.fileList = event.target.files;
    // this.readyForUploadItems = fileList



    // this.fileList = event.target.files;
    // if(fileList?.length>0){
    //   // this.cloudinaryService.UploadImage(fileList).subscribe(res => {
    //   //   console.log("uploaded = ",res);
    //   // })

    // }
    // this.isLoading = false;
  }







  cancelUpload(){
    this.dialog.closeAll()
  }


  uploadNow() {
    this.isLoading = true;
    this.buttonDisable = true;
    console.log(this.isLoading)

    // for(let file of this.fileList) {
    //   this.PhotoInfo.get('Image')?.setValue()
    //   this.readyForUploadItems
    // }

    console.log(this.fileList)
    let cnt = 0;

    let callList:any[] = [];
        for(let image of this.fileList){
          callList.push(this.cloudinaryService.UploadImage(image));
        };

        combineLatest(callList).subscribe((res:any)=>{
          console.log(res);
          this.isLoading = false
          this.buttonDisable = false;

          let dbUploadList: any[] = [];

          for(let image of res) {
            this.PhotoInfo.get('Image')?.setValue(image.url);
    //   this.readyForUploadItems
            dbUploadList.push(this.commonService.postPhotos(this.PhotoInfo.value, this.databaseCollection))
          }

          forkJoin(dbUploadList).subscribe((res2: any) => {
            console.log(res2);
            this.dialogRef.close(this.databaseCollection)
          })


        })

    // return myuploadPromise
    // .then(res => {
    //   console.log(res);
    //   this.isLoading = false
    //   this.buttonDisable = false
    // })

    // setTimeout(()=>{
    //   this.isLoading = false;
    //   this.buttonDisable = false;
    //   this.dialogRef.close(this.databaseCollection)
    // },this.numberofPhotos *210)
  }

}
