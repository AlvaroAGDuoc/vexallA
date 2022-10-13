import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-ver-recorrido',
  templateUrl: './ver-recorrido.page.html',
  styleUrls: ['./ver-recorrido.page.scss'],
})
export class VerRecorridoPage implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;

  distancia;

  rutaSeleccionada: any = {}

  constructor(private storage: Storage, private geo: GeolocationService) {
  }

  ngOnInit() {
    this.storage.get('rutaSeleccionada').then((val) => {
      this.rutaSeleccionada = val
      console.log("ORIGEN: ", typeof this.rutaSeleccionada.origen)
    })

  }

  obtenerDireccion() {
    this.geo.calcularRuta(this.rutaSeleccionada.origen , this.rutaSeleccionada.destino , this.distancia)
  }

   ngAfterViewInit():void {
     this.geo.inicioMapa(this.divMap)
  }

}
