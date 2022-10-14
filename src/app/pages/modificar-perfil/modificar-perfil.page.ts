import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { LoadingPage } from '../loading/loading.page';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  formGroup: any
  usuario: any = {}

  constructor(private storage: Storage,  private servicioBD: BdservicioService, private router: Router, private loading: LoadingPage) {

    this.storage.get('usuario').then((val) => this.usuario = val)

    this.formGroup = new FormGroup({
      nombre_usuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    })
  }

  modificarPerfil() {

    let nombre_usuario = (document.getElementById('nombre_usuario') as HTMLInputElement).value;
    let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    let apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
    let email = (document.getElementById('email') as HTMLInputElement).value;

    let actUsuario = {
      id_usuario: this.usuario.id_usuario,
      nombre_usuario: nombre_usuario,
      clave: this.usuario.clave,
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      rol_id: this.usuario.rol_id,
      foto: this.usuario.foto
    }

    let pagina = 'pantalla-principal'

    if(this.formGroup.valid){
      this.servicioBD.modificarUsuario(nombre_usuario, nombre, apellidos, email, this.usuario.id_usuario).then((res) => {
        this.servicioBD.presentToast('Perfil actualizado con exito')
        this.storage.set('usuario', actUsuario)
        this.loading.loadContent(pagina);
      })
    }
    
  }


  async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
  }
}
