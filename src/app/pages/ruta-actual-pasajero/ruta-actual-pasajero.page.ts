import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BdservicioService } from 'src/app/services/bdservicio.service';

@Component({
  selector: 'app-ruta-actual-pasajero',
  templateUrl: './ruta-actual-pasajero.page.html',
  styleUrls: ['./ruta-actual-pasajero.page.scss'],
})
export class RutaActualPasajeroPage implements OnInit {

  ruta: any = {}
  rutaVacia: any = {}

  constructor(private storage: Storage, private servicioBD: BdservicioService, private router: Router) { }

  cancelarRuta(){
    this.servicioBD.cancelarRuta(this.ruta.usuario_id, this.ruta.viaje_id).then((res) =>{
      this.servicioBD.presentToast('Ruta cancelada con exito')
      this.storage.set('rutaSeleccionada', this.rutaVacia)
      this.router.navigate(['pantalla-principal'])
    })
  }

  ngOnInit() {
    this.storage.get('rutaSeleccionada').then((val) => {
      this.ruta = val
  })
}

}
