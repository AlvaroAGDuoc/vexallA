import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { validacionesCustom, validarClaves } from '../registro-vehiculo/registro.validator';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-paso2-olvidada',
  templateUrl: './paso2-olvidada.page.html',
  styleUrls: ['./paso2-olvidada.page.scss'],
})
export class Paso2OlvidadaPage implements OnInit {

  formGroup: any;
  
  usuario : any;

  constructor(private validacionesCustom: validacionesCustom, private servicioBD: BdservicioService, private router: Router, private storage: Storage) { 
   

    this.formGroup = new FormGroup({
      clave: new FormControl('', [Validators.required, Validators.minLength(6), this.validacionesCustom.validarMayuscula(), this.validacionesCustom.validarMinuscula(), this.validacionesCustom.validarNumero()], ),
      confirmarClave: new FormControl('', [Validators.required])
    }, {
      validators: [validarClaves]
    })
  }

  revisarSiSonIguales(): boolean {
    return this.formGroup.hasError('noSonIguales') &&
      this.formGroup.get('clave').dirty &&
      this.formGroup.get('confirmarClave').dirty;
  }


  cambiarClave() {
    let clave1 = (document.getElementById('clave1') as HTMLInputElement).value;
    if (this.formGroup.valid) {    
      console.log('USUAARIO:', this.usuario)
      this.servicioBD.editarClaveNombre(clave1, this.usuario )
      this.servicioBD.presentToast('Clave cambiada con exito')
      this.router.navigate(['/login'])
    }else(
      this.servicioBD.presentToast2('malo')
    )
  }

   ngOnInit() {
    this.storage.get('usuarioClave').then((val)=> {
      this.usuario = val
      console.log(this.usuario)
    })

  }

}
