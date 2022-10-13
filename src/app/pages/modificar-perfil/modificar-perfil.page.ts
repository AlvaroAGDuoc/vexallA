import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {



  formGroup: any

  constructor() {

    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    })


  }


  ngOnInit() {
  }

}
