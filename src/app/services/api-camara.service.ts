import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCamaraService {

  foto = new BehaviorSubject('');
  formFoto : any;

  constructor(private camera: Camera) { }


  tomameFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.formFoto = 'data:image/jpeg;base64,' + imageData;
      this.foto.next(this.formFoto) ;
    }, (err) => {
      console.log(err)
    });
  }
}
