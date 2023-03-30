import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { UploadService } from 'src/app/services/upload.service';
import { ConfigService } from 'src/app/services/config.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  @Input() uploadFolder = "";
  @Output() uploadFileEvent = new EventEmitter();
  constructor(
    private uploadService: UploadService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
  }

  imageChangedEvent: any = '';
  iamgeURl: string = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      // console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
  }

  rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }


  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  toggleContainWithinAspectRatio() {
      this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
      this.transform = {
          ...this.transform,
          rotate: this.rotation
      };
  }

  uploadFile(){
    if(this.croppedImage){
      let fileToUpload = new File([this.b64toBlob(this.croppedImage)], "avatar.png");
      this.uploadService.uploadImage("Avatars", fileToUpload).subscribe(res => {
        if(res.path){
          this.uploadFileEvent.emit(res.path);
        } else {
          this.notification.error('Thông báo', 'Có lỗi xảy ra!');
        }
      }, error => {
        this.notification.error('Thông báo', 'Có lỗi xảy ra!');
      })
    }
  }

  b64toBlob = (b64Data:any, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}
