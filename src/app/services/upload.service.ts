import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { UrlConstant } from '../share/Constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends ConfigService{

  uploadImage(folder: string, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.postFile(UrlConstant.UPLOAD + `/Image/${folder}`, formData);
  }
}
