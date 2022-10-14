import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BdservicioService } from 'src/app/services/bdservicio.service';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.page.html',
  styleUrls: ['./pantalla-principal.page.scss'],
})
export class PantallaPrincipalPage implements OnInit {
  usuario: any = {}

  ruta: any = {}
  constructor(private storage: Storage, private servicioBD: BdservicioService, private router: Router) {}


  rutaActual() {
    this.router.navigate(['ruta-actual'])
  }

  async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();

   this.storage.get('usuario').then((val) => {
      this.usuario = val
      if(this.usuario.email === '' || this.usuario.nombre === '' || this.usuario.apellidos === '') {
        this.servicioBD.presentAlert('ALERTA', 'Faltan datos de usuario', 'Seras redirigido a la pagina')
        this.router.navigate(['modificar-perfil'])  
      }
       this.servicioBD.buscarRutaActual(this.usuario.id_usuario).then((res) => {
        this.ruta = res
      })
    })
   


  }


}
