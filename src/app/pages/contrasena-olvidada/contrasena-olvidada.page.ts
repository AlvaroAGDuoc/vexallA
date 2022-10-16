import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { LoadingPage } from '../loading/loading.page';


@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.page.html',
  styleUrls: ['./contrasena-olvidada.page.scss'],
})
export class ContrasenaOlvidadaPage implements OnInit {

  value = 0;
  loading = false;

 

  formGroup: any;

  constructor(private servicioBD: BdservicioService, private storage: Storage, private load: LoadingPage) {

    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    })

  }
 

  validarUsuario() {

    let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    let pagina = 'paso2-olvidada'
    if (this.formGroup.valid) {
      this.servicioBD.validarNombre(nombre).then((res) => {
        if (res) {
          this.servicioBD.presentToast2('El nombre no se encuentra registrado')
        } else {
          this.storage.set('usuarioClave', nombre)
          this.servicioBD.presentToast('Usuario valido')
          this.load.loadContent(pagina)
        }
      })
    }
  }

 async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
 }

}
