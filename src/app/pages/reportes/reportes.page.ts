import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  fechaActual = new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate())
  fechaLimite = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())


  fechaMinima: string;
  fechaMaxima: string;

  formRep: any;

  usuario: any;

  reportes: any = []

  total = 0;

  constructor(private date: DatePipe, private servicioBD: BdservicioService, private storage: Storage) {

    this.formRep = new FormGroup({

      fecha1: new FormControl('', [Validators.required]),
      fecha2: new FormControl('', [Validators.required]),
    }, {
      validators: [this.validarFechas]
    });
  }

  revisarFechas(): boolean {
    return this.formRep.hasError('fechaInvalida') &&
      this.formRep.get('fecha1').dirty &&
      this.formRep.get('fecha2').dirty;
  }

  consultar(): void {
    
    if (this.formRep.valid) {
      this.total = 0
      this.servicioBD.generarReporte(this.formRep.get('fecha1').value, this.formRep.get('fecha2').value, this.usuario.id_usuario).then((res) => {
        // this.servicioBD.fetchReportes().subscribe(item => {
          this.reportes = res;
          if (this.reportes.length < 1) {
            this.servicioBD.presentToast2('No tienes viajes en este periodo de tiempo')
            this.total = 0
          } else {          
            for(let x = 0; x < this.reportes.length; x++){
              this.total += this.reportes[x].monto * this.reportes[x].asientos_ocupados
            }
            (document.getElementById('total') as HTMLElement).removeAttribute('hidden');
          }

        })
      // })
    }
  }
  

  ngOnInit() {

    this.storage.get('usuario').then((val) => this.usuario = val)

    this.fechaMinima = this.date.transform(this.fechaActual, "yyyy-MM-dd");

    this.fechaMaxima = this.date.transform(this.fechaLimite, "yyyy-MM-dd");
  }

  validarFechas: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

    const fecha1 = control.get('fecha1').value;
    const fecha2 = control.get('fecha2').value;

    let invalido: boolean = false;

    if (fecha1 > fecha2) {
      invalido = true
    } else {
      invalido = false
    }

    return invalido ? { fechaInvalida: true } : null;

  };



}


