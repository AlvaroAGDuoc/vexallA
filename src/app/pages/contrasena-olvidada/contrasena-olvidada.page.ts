import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.page.html',
  styleUrls: ['./contrasena-olvidada.page.scss'],
})
export class ContrasenaOlvidadaPage implements OnInit {

  value = 0;
  loading = false;

 

  formGroup: any;

  constructor(private servicioBD: BdservicioService, private router: Router, private storage: Storage) {

    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    })

  }
 

  validarUsuario() {

    let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    if (this.formGroup.valid) {
      this.servicioBD.validarNombre(nombre).then((res) => {
        if (res) {
          this.servicioBD.presentToast2('NO')
        } else {

          this.storage.set('usuarioClave', nombre)
          this.servicioBD.presentToast('Usuario valido')
          this.router.navigate(['/paso2-olvidada'])
        }
      })
    }
  }

 async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
 }

}
