import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { CommonService } from '../Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  myGallery: any = [];

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showBasic()
  }

  showImage(imageUrl: string) {
    console.log(imageUrl);
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
    }).afterClosed().subscribe(res => {
      if(res == 'photos'){
        this.showBasic();
      }
      else{
        this.showWedding();
      }
    })
  }

  showWedding(){
    this.loadGallery('wedding-photos')
  }

  showBasic() {
    this.loadGallery('photos')
  }

}
