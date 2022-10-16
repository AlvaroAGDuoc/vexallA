import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { LoadingPage } from '../loading/loading.page';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.page.html',
  styleUrls: ['./pantalla-principal.page.scss'],
})
export class PantallaPrincipalPage implements OnInit {
  usuario: any = {}

  ruta: any = {}
  pagina = 'login'
  constructor(private storage: Storage, private servicioBD: BdservicioService, private router: Router, private load: LoadingPage ) {

  }

  desconectarse(){
    this.storage.set('usuario', this.usuario)
    this.load.loadContent(this.pagina)
  }

  async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();

    await this.storage.get('usuario').then((val) => {
      this.usuario = val
      if (this.usuario.email === '' || this.usuario.nombre === '' || this.usuario.apellidos === '') {
        this.servicioBD.presentAlert('ALERTA', 'Faltan datos de usuario', 'Seras redirigido a la pagina')
        this.router.navigate(['modificar-perfil'])
      }
    })
    await this.servicioBD.buscarRutaActual(this.usuario.id_usuario, this.usuario.id_usuario)
    await this.servicioBD.rutaActual.subscribe(item => {
      this.ruta = item;
      this.storage.set('rutaSeleccionada', this.ruta)
    })
  }
}
