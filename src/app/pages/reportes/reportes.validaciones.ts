
// import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


// export const validarFechas: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

//     const fechaaa = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

//     const fecha1 = control.get('fecha1').value;
//     const fecha2 = control.get('fecha2').value;

//     console.log('FECHA PRUEBA: ', fechaaa)
//     console.log('FECHA1',fecha1)
//     console.log('FECHA2',fecha2)
    
//     let invalido: boolean = false;

//     if((fecha1 > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) || (fecha1 < new Date(new Date().getFullYear(), new Date().getMonth()-6, new Date().getDate()) || fecha2 > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) || fecha2  < new Date(new Date().getFullYear(), new Date().getMonth()-6, new Date().getDate()))){
//         invalido = true
//     } {
//         invalido = false
//     }

//     return invalido ? {fechaInvalida: true} : null ;

//   };