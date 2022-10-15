import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { LoadingPage } from '../loading/loading.page';

@Component({
  selector: 'app-ruta-actual-pasajero',
  templateUrl: './ruta-actual-pasajero.page.html',
  styleUrls: ['./ruta-actual-pasajero.page.scss'],
})
export class RutaActualPasajeroPage implements OnInit {

  ruta: any = {}

  constructor(private storage: Storage, private servicioBD: BdservicioService, private load: LoadingPage, private alertController: AlertController) { }




  async cancelarRuta() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro de cancelar la ruta?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Si',
          handler: () =>{
            let pagina = 'pantalla-principal'
            this.servicioBD.cancelarRuta(this.ruta.usuario_id, this.ruta.viaje_id).then(() =>{
              this.servicioBD.presentToast('Ruta cancelada con exito')
              this.storage.remove('rutaSeleccionada')
              this.load.loadContent(pagina)
            })
          },
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  // cancelarRuta(){
  //   let pagina = 'pantalla-principal'
  //   this.servicioBD.cancelarRuta(this.ruta.usuario_id, this.ruta.viaje_id).then((res) =>{
  //     this.servicioBD.presentToast('Ruta cancelada con exito')
  //     this.storage.remove('rutaSeleccionada')
  //     this.load.loadContent(pagina)
  //   })
  // }

  ngOnInit() {
    this.storage.get('rutaSeleccionada').then((val) => {
      this.ruta = val
  })
}

}
