import { Component, OnInit } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-ruta-actual',
  templateUrl: './ruta-actual.page.html',
  styleUrls: ['./ruta-actual.page.scss'],
})
export class RutaActualPage implements OnInit {

  ruta: any = {}
  pasajeros: any = []

  constructor(private storage: Storage, private servicioBD: BdservicioService) { 
    

  }

  ngOnInit() {
    this.storage.get('rutaSeleccionada').then((val) => {
      this.ruta = val
      console.log('RUTA', JSON.stringify(this.ruta))
      this.servicioBD.buscarPasajeros(this.ruta.viaje_id).then((res) =>{
        this.pasajeros = res
        console.log('PASAJEROS', JSON.stringify(this.pasajeros))
      })
    }) 

  }

}
