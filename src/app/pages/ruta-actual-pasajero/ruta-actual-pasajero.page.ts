import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { LoadingPage } from '../loading/loading.page';

@Component({
  selector: 'app-ruta-actual-pasajero',
  templateUrl: './ruta-actual-pasajero.page.html',
  styleUrls: ['./ruta-actual-pasajero.page.scss'],
})
export class RutaActualPasajeroPage implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;

  ruta: any = {}

  distancia: any ;

  constructor(private storage: Storage, private servicioBD: BdservicioService, private load: LoadingPage, private alertController: AlertController, private geo: GeolocationService) { }



  verRuta(){
    this.geo.calcularRuta(this.ruta.origen , this.ruta.destino , this.distancia);
    
    (document.getElementById('mapa') as HTMLDivElement).removeAttribute('hidden');
    (document.getElementById('distancia') as HTMLElement).removeAttribute('hidden');
  }


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



  ngOnInit() {
    this.storage.get('rutaSeleccionada').then((val) => {
      this.ruta = val
  })
}

ngAfterViewInit():void {
  this.geo.inicioMapa(this.divMap)
}

}
