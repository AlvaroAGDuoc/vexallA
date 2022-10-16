import { Component, OnInit } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ApiService } from 'src/app/services/api.service';
import { LoadingPage } from '../loading/loading.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuarios : any;

  foto= new Blob;

  constructor( private servicioBD: BdservicioService, private storage: Storage,  private api: ApiService, private loading: LoadingPage) {

  }

  pagina = 'pantalla-principal'

  validarUsuario(nombre: string, clave: string) {
    this.servicioBD.validarUsuario(nombre, clave).then((res) => {
      if (res) {
        this.servicioBD.presentToast2('Usuario o contraseña incorrecta')
      } else {
        this.servicioBD.mandarDatosUsuario(nombre).then((usuario) => {      
          this.storage.set('usuario', usuario)
          this.loading.loadContent(this.pagina);
        })
      }
    }
    )
  }

  async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    
    this.api.getUsers().subscribe((res) => {
      this.usuarios = res;
      for(var i = 0; i < this.usuarios.length; i++){
        this.servicioBD.agregarUsuario(this.usuarios[i].id, this.usuarios[i].nombre, this.usuarios[i].clave, '', '', '', this.usuarios[i].id_rol, this.foto)
      }
    }, (error) => {
      console.log('ERROR USERS', error);
    });
  }

}
