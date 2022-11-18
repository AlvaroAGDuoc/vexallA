import { Component, OnInit } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.page.html',
  styleUrls: ['./lista-vehiculo.page.scss'],
})
export class ListaVehiculoPage implements OnInit {

  arregloVehiculo: any = [
    {
      patente: '',
      color: '',
      modelo: '',
      annio: '',
      marca_id: '',
      usuario_id: '',
      nombre_marca: ''
    }
  ]

  usuario: any = {};


  constructor(private servicioBD: BdservicioService, private storage: Storage, private router: Router, private alertController: AlertController) {}

  async eliminar(x) {
    const alert = await this.alertController.create({
      header: '¿Estas seguro de eliminar el vehiculo?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Si',
          handler: () =>{
            this.servicioBD.eliminarVehiculo(x.patente);
            this.servicioBD.presentToast("Vehiculo Eliminado");
          },
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

   ngOnInit() {

    this.storage.get('usuario').then((val) => {
      this.usuario = val
      if(this.usuario.email === '' || this.usuario.nombre === '' || this.usuario.apellidos === '') {
        this.servicioBD.presentAlert('ALERTA', 'Faltan datos de usuario', 'Seras redirigido a la pagina')
        this.router.navigate(['modificar-perfil'])  
      }
      this.servicioBD.dbState().subscribe(res => {
        if (res) {
          this.servicioBD.fetchVehiculos().subscribe(item => {
            this.arregloVehiculo = item.filter(v => v.usuario_id == this.usuario.id_usuario);
          })
        }
      })
    })
     

  }


}
