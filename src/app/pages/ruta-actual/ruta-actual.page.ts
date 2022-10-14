import { Component, OnInit } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-actual',
  templateUrl: './ruta-actual.page.html',
  styleUrls: ['./ruta-actual.page.scss'],
})
export class RutaActualPage implements OnInit {

  ruta: any = {}
  pasajeros: any = []

  rutaVacia: any = {}

  constructor(private storage: Storage, private servicioBD: BdservicioService, private router: Router) {}

  eliminarRuta(){
    this.servicioBD.eliminarRuta( this.ruta.viaje_id).then((res) =>{
      this.servicioBD.presentToast('Ruta eliminada con exito')
      this.storage.set('rutaSeleccionada', this.rutaVacia)
      this.router.navigate(['pantalla-principal'])
    })
  }

  ngOnInit() {
    this.storage.get('rutaSeleccionada').then((val) => {
      this.ruta = val
      this.servicioBD.buscarPasajeros(this.ruta.viaje_id).then((res) =>{
        this.pasajeros = res
      })
    }) 

  }

}
