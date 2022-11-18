import { Component, OnInit } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { LoadingPage } from '../loading/loading.page';


@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})

export class ViajePage implements OnInit {

  arregloRutas: any = [{
    usuario_id: '',
    viaje_id: '',
    nombre_usuario: '',

    color: '',
    modelo: '',
    patente: '',

    fecha_viaje: '',
    hora_salida: '',
    asientos_dispo: '',
    monto: '',
    origen: '',
    destino: '',
    status: ''
  }]

  rutaBuscada: any;


  constructor(private servicioBD: BdservicioService, private storage: Storage, private load: LoadingPage) {
  }


  buscarxRuta($event) {
    const texto = $event.target.value;
    this.rutaBuscada = this.arregloRutas;
    if(texto && texto.trim() != '') {
      this.rutaBuscada = this.rutaBuscada.filter((ruta: any) => {
        return (ruta.origen.toLowerCase().indexOf(texto.toLowerCase()) > -1);
      })
    }
  }

  verRecorrido(id_viaje) {
    this.servicioBD.buscarRuta(id_viaje).then((res)=> {
      this.storage.set('rutaSeleccionada', res)
      this.load.loadContent('ver-recorrido')
    })
  }

  async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    
    await this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchRutas().subscribe(item => {
          this.arregloRutas = item;
          this.rutaBuscada = this.arregloRutas;
        })
      }
    })
  }

}
