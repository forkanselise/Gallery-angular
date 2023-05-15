import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  myGallery: any = [];

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.showBasic()
  }

  loadGallery(galleryType: string) {
    this.myGallery.splice(0);
    this.commonService.getPhotos(galleryType).subscribe(res => {
      this.myGallery = res;
      console.log(this.myGallery);
    })
  }

  openDialog(isWedding: boolean) {
    this.dialog.open(DialogboxComponent, {
      data: {'isWedding': isWedding}
    })
  }

  showWedding(){
    this.loadGallery('wedding-photos')
  }

  showBasic() {
    this.loadGallery('photos')
  }

}
