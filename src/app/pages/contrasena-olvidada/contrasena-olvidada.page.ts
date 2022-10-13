import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { validarClaves, validacionesCustom } from '../registro-vehiculo/registro.validator';


@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.page.html',
  styleUrls: ['./contrasena-olvidada.page.scss'],
})
export class ContrasenaOlvidadaPage implements OnInit {

  value = 0;
  loading = false;

  formGroup: any;

  form2: any;

  constructor(private servicioBD: BdservicioService, private router: Router) {

    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    })

    this.form2 = new FormGroup({
      clave: new FormControl('', [Validators.required]),
      confirmarClave: new FormControl('', [Validators.required])})
    // }, {
    //   validators: [validarClaves]
    // })

  }

  // revisarSiSonIguales(): boolean {
  //   return this.formGroup.hasError('noSonIguales') &&
  //     this.formGroup.get('clave').dirty &&
  //     this.formGroup.get('confirmarClave').dirty;
  // }
 

  validarUsuario() {

    let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    if (this.formGroup.valid) {
      this.servicioBD.validarNombre(nombre).then((res) => {
        if (res) {
          this.servicioBD.presentToast('NO')
        } else {
          (document.getElementById('form2') as HTMLElement).removeAttribute("hidden");
          (document.getElementById('aceptar') as HTMLElement).setAttribute("hidden", '');
        }
      })
    }
  }

  cambiarClave() {
    let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    let clave1 = (document.getElementById('clave1') as HTMLInputElement).value;
    if (this.form2.valid) {
      this.servicioBD.editarClaveNombre(nombre, clave1)
      this.servicioBD.presentToast('Clave cambiada con exito')
      this.router.navigate(['/login'])
    }else(
      this.servicioBD.presentToast2('malo')
    )
  }


  // cargando() {

  //   if(this.formGroup.valid) {
  //     this.loading = true;
  //     const subs$: Subscription = interval(200).subscribe(res => {
  //       this.value = this.value + 20;
  //       if (this.value === 120) {
  //         subs$.unsubscribe();
  //         this.loading = false;
  //         this.value = 0; 
  //       }
  //     });
  //   }

  // }




  ngOnInit() {
  }

}
