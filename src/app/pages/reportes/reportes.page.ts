import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  fechaActual = new Date(new Date().getFullYear(), new Date().getMonth()-6, new Date().getDate())
  fechaLimite = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())


  fechaMinima: string;
  fechaMaxima: string;

  formRep: any;

  constructor( private date: DatePipe) {

    this.formRep = new FormGroup({

     fecha1: new FormControl('', [Validators.required]),
      fecha2: new FormControl('', [Validators.required]),
  }, {
    validators: [this.validarFechas]
  });
  }

  revisarFechas(): boolean {
    return this.formRep.hasError('fechaInvalida')&&
    this.formRep.get('fecha1').dirty &&
    this.formRep.get('fecha2').dirty;
  }


  consultar(): void {
    if(this.formRep.valid){  
      console.log('xd')
    }

  }

  ngOnInit() {
    this.fechaMinima = this.date.transform(this.fechaActual , "yyyy-MM-dd");

    this.fechaMaxima = this.date.transform(this.fechaLimite , "yyyy-MM-dd");
  }

  validarFechas: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

    const fecha1 = control.get('fecha1').value;
    const fecha2 = control.get('fecha2').value;
    
    let invalido: boolean = false;
  
    if(fecha1 > fecha2 ){
        invalido = true
    } else{
        invalido = false
    }
  
    return invalido ? {fechaInvalida: true} : null ;
  
  };



}


