import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiCamaraService } from 'src/app/services/api-camara.service';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: any = {};


  constructor(private storage: Storage, private camera: ApiCamaraService, private bd: BdservicioService, private router: Router) {
   
  }

  async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();

    this.storage.get('usuario').then((val) => {
      this.usuario = val
      if(this.usuario.email === '' || this.usuario.nombre === '' || this.usuario.apellidos === '') {
        this.bd.presentAlert('ALERTA', 'Faltan datos de usuario', 'Seras redirigido a la pagina')
        this.router.navigate(['modificar-perfil'])  
      }
    })

  }

  async tomarFoto() {
    await this.camera.tomameFoto()
    await this.camera.foto.subscribe((res) => {
      this.usuario.foto = res
      this.storage.set('usuario', this.usuario)   
      this.bd.editarFotoUsuario(this.usuario.id_usuario, this.usuario.foto)

    });

  }


}
