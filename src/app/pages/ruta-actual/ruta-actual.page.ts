import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingPage } from '../loading/loading.page';
import { GeolocationService } from 'src/app/services/geolocation.service';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ruta-actual',
  templateUrl: './ruta-actual.page.html',
  styleUrls: ['./ruta-actual.page.scss'],
})
export class RutaActualPage implements OnInit {


  @ViewChild('divMap') divMap!: ElementRef;

  ruta: any = {}
  pasajeros: any = []

  distancia: any ;

  pagina = 'pantalla-principal';


  constructor(private storage: Storage, private servicioBD: BdservicioService, private load: LoadingPage, private geo: GeolocationService, private alertController: AlertController) {}



  empezarRuta(){
    this.servicioBD.empezarRuta(this.ruta.viaje_id).then(() => {
      this.servicioBD.presentToast('La ruta ha empezado');
      this.geo.calcularRuta(this.ruta.origen , this.ruta.destino , this.distancia);

      (document.getElementById('mapa') as HTMLDivElement).removeAttribute('hidden');
      (document.getElementById('distancia') as HTMLElement).removeAttribute('hidden');
      (document.getElementById('terminar') as HTMLElement).removeAttribute('hidden');
      (document.getElementById('eliminar') as HTMLElement).setAttribute('hidden', 'true');
      (document.getElementById('comenzar') as HTMLElement).setAttribute('hidden', 'true');
    })
    this.ruta.status = 2
    this.storage.set('rutaSeleccionada', this.ruta)
  }

  terminarRuta() {
    this.servicioBD.terminarRuta(this.ruta.viaje_id).then(() => {
      this.servicioBD.presentToast('La ruta ha terminado');
      this.ruta.status = 3
      this.storage.set('rutaSeleccionada', this.ruta)
      this.load.loadContent(this.pagina)
    })
  }

  async eliminarRuta() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro de eliminar la ruta?',
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
            this.servicioBD.eliminarRuta(this.ruta.viaje_id).then((res) =>{
              this.servicioBD.presentToast('Ruta eliminada con exito')
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


  async ngOnInit() {

    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();

    await this.storage.get('rutaSeleccionada').then((val) => {
      this.ruta = val
      this.servicioBD.buscarPasajeros(this.ruta.viaje_id).then((res) =>{
        this.pasajeros = res
      })
    }) 

    await this.servicioBD.rutaActual.subscribe(item => {
      this.ruta = item;
      this.storage.set('rutaSeleccionada', this.ruta)
    })
  }

  ngAfterViewInit():void {
    this.geo.inicioMapa(this.divMap)
 }

}
