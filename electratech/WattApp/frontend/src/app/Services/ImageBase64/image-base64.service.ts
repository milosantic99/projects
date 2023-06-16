import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageBase64Service {

  constructor(private sanitizer: DomSanitizer) { }

  getPicture(imgString:string){
    if(imgString != '')
    {
      var image: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${imgString}`);
      return image;
    }
    var imageSrc = "../../../assets/images/user.png";
    return imageSrc;
  }

}
