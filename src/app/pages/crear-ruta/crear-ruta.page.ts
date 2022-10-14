///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Router } from '@angular/router';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.page.html',
  styleUrls: ['./crear-ruta.page.scss'],
})
export class CrearRutaPage implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('rutaInicio') rutaInicio!: ElementRef;
  @ViewChild('rutaFin') rutaFin!: ElementRef;

  distancia;


  formMapas!: FormGroup;

  usuario: any = {};

  arregloVehiculo: any = [
    {
      patente: '',
      color: '',
      modelo: '',
      annio: '',
      marca_id: '',
      usuario_id: '',
      nombre_marca: ''
    }
  ]

  patenteSeleccionada = '';


  constructor(private router: Router, private bd: BdservicioService, private storage: Storage, private geo: GeolocationService) {


    this.formMapas = new FormGroup({
      vehiculos: new FormControl('', []),
      ruta1: new FormControl('', [Validators.required]),
      ruta2: new FormControl('', [Validators.required]),
      precio: new FormControl(''),
      asientos: new FormControl(''),
    })

  }

  vehiculoSeleccionado(e) {
    this.patenteSeleccionada = e.target.value
  }

 async  ngOnInit() {

    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    
    await this.storage.get('usuario').then((val) => {
      this.usuario = val
      this.bd.dbState().subscribe(res => {
        if (res) {
          this.bd.fetchVehiculos().subscribe(item => {
            this.arregloVehiculo = item.filter(v => v.usuario_id == this.usuario.id_usuario);
          })
        }
      })
    })
  }

  async ngAfterViewInit() {
    await this.geo.inicioMapa(this.divMap)
    await this.geo.cargarAutoComplete(this.rutaInicio, this.rutaFin)
  }

  calcularRuta() {
    let ruta1 = (document.getElementById('rutaInicio') as HTMLInputElement).value;
    let ruta2 = (document.getElementById('rutaFin') as HTMLInputElement).value;
    this.geo.calcularRuta(ruta1, ruta2, this.distancia)
  }


  crearRuta() {
    if (this.formMapas.valid) {
      let fecha = new Date()
      let hora_actual = fecha.toLocaleTimeString()
      let fecha_viaje = fecha.toLocaleDateString()
      let asientos = (document.getElementById('asientos') as HTMLInputElement).value;
      let precio = (document.getElementById('precio') as HTMLInputElement).value;
      let ruta1 = (document.getElementById('rutaInicio') as HTMLInputElement).value
      let ruta2 = (document.getElementById('rutaFin') as HTMLInputElement).value
      let status = 1;

      let datosStorage = {
        usuario_id: this.usuario.id_usuario,
        nombre_usuario: this.usuario.nombre_usuario,
        fecha_viaje: fecha,
        hora_salida: hora_actual,
        asientos_dispo: asientos,
        monto: precio,
        origen: ruta1,
        destino: ruta2,
        status: status
      }
      this.bd.agregarRuta(fecha_viaje, hora_actual, asientos, precio, this.patenteSeleccionada, this.usuario.id_usuario, status, ruta1, ruta2)
      this.storage.set('rutaSeleccionada', datosStorage)
      this.router.navigate(['/pantalla-principal'])
    } else {
      this.bd.presentToast2("Todos los campos deben ser llenados")
    }
  }


}
