import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { validarClaves, validacionesCustom } from '../registro-vehiculo/registro.validator';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
})
export class CambiarClavePage implements OnInit {

  formGroup: any
  usuario: any = {}
  
  constructor( private servicioBD: BdservicioService, private storage: Storage, private router: Router) {

    this.storage.get('usuario').then((val) => {
      this.usuario = val
    })

    this.formGroup = new FormGroup({
      clave: new FormControl('', [Validators.required]),
      confirmarClave: new FormControl('', [Validators.required]),
      claveActual: new FormControl('', [Validators.required]),
    }, {
      validators: [validarClaves]
    })

   }
   revisarSiSonIguales(): boolean {
    return this.formGroup.hasError('noSonIguales') &&
      this.formGroup.get('clave').dirty &&
      this.formGroup.get('confirmarClave').dirty;
  }



  validarClaveActual() {
    let clave =  (document.getElementById('claveActual') as HTMLInputElement).value;
    let claveNueva = (document.getElementById('claveNueva') as HTMLInputElement).value;
    if(this.formGroup.valid){
      this.servicioBD.validarClave(clave).then((res) => {
        if (res) {
          this.servicioBD.presentToast('NO')
        } else {
          this.usuario.clave = claveNueva
          this.storage.set('usuario', this.usuario)
          this.servicioBD.editarClaveUsuario(this.usuario.id_usuario, claveNueva)
          this.servicioBD.presentToast('Clave cambiada con exito')
          this.router.navigate(['/perfil'])
        }
      }
    )
    }
    }


  ngOnInit() {
  }

}
