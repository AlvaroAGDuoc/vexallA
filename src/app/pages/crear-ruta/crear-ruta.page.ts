///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import { GeolocationService } from 'src/app/services/geolocation.service';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { DatePipe } from '@angular/common';
import { LoadingPage } from '../loading/loading.page';

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

  fechaActual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() )

  fechaMinima: string;

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


  constructor( private bd: BdservicioService, private storage: Storage, private geo: GeolocationService, private date: DatePipe, private load : LoadingPage) {



    this.formMapas = new FormGroup({
      vehiculos: new FormControl('', []),
      ruta1: new FormControl('', [Validators.required]),
      ruta2: new FormControl('', [Validators.required]),
      precio: new FormControl('', Validators.min(1500)),
      asientos: new FormControl('', [Validators.required, Validators.min(1), Validators.max(4)]),
      fecha: new FormControl(''),
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
      let fecha_viaje = this.date.transform(this.fechaActual , "yyyy-MM-dd");
      let asientos = (document.getElementById('asientos') as HTMLInputElement).value;
      let precio = (document.getElementById('precio') as HTMLInputElement).value;
      let ruta1 = (document.getElementById('rutaInicio') as HTMLInputElement).value
      let ruta2 = (document.getElementById('rutaFin') as HTMLInputElement).value
      let status = 1;
      let asientos_ocupados= 0
        
      let pagina = 'pantalla-principal'
      let datosStorage = {
        usuario_id: this.usuario.id_usuario,
        nombre_usuario: this.usuario.nombre_usuario,
        fecha_viaje: fecha,
        hora_salida: hora_actual,
        asientos_dispo: asientos,
        asientos_ocupados : asientos_ocupados,
        monto: precio,
        origen: ruta1,
        destino: ruta2,
        status: status
      }
      this.bd.agregarRuta(fecha_viaje, hora_actual, asientos, asientos_ocupados, precio, this.patenteSeleccionada, this.usuario.id_usuario, status, ruta1, ruta2)
      this.storage.set('rutaSeleccionada', datosStorage)
      this.bd.presentToast('Ruta creada con exito')
      this.load.loadContent(pagina)
    } else {
      this.bd.presentToast2("Todos los campos deben ser llenados")
    }
  }




}


