import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  usuario: any = {}

  constructor(private storage: Storage, private geo: GeolocationService, private servicioBD: BdservicioService,  private router: Router) {
    
  }

  ngOnInit() {
    
    this.storage.get('rutaSeleccionada').then((val) => {
      this.rutaSeleccionada = val
    })

    this.storage.get('usuario').then((val) => {
      this.usuario = val
    })
  }

  obtenerDireccion() {
    this.geo.calcularRuta(this.rutaSeleccionada.origen , this.rutaSeleccionada.destino , this.distancia)
  }

   ngAfterViewInit():void {
     this.geo.inicioMapa(this.divMap)
  }

  unirseRuta() {
    this.servicioBD.unirseRuta(this.rutaSeleccionada.viaje_id, this.usuario.id_usuario)
    this.servicioBD.updateRuta(this.rutaSeleccionada.viaje_id)
   this.rutaSeleccionada.asientos_dispo -= 1
   this.rutaSeleccionada.asientos_ocupados += 1
   this.storage.set('rutaSeleccionada', this.rutaSeleccionada )
   this.servicioBD.presentToast('Te has unido a la ruta con exito')
   this.router.navigate(['pantalla-principal'])
  }
}
