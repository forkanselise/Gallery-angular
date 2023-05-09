import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../Services/common.service';

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

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogboxComponent>,
    private fb: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
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
      this.commonService.postPhotos(res).subscribe()
    })
    this.isLoading=false;
  }

}
