import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiCamaraService } from 'src/app/services/api-camara.service';
import { BdservicioService } from 'src/app/services/bdservicio.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: any = {
    id_usuario: '',
    nombre_usuario: '',
    clave: '',
    rol_id: '',
    foto: Blob
  };

  constructor(private storage: Storage, private camera: ApiCamaraService, private bd: BdservicioService) {
    this.storage.get('usuario').then((val) => {
      this.usuario = val
    })
  }

  ngOnInit() {
   
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
