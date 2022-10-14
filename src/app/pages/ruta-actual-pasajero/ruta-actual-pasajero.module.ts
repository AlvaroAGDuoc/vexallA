import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutaActualPasajeroPageRoutingModule } from './ruta-actual-pasajero-routing.module';

import { RutaActualPasajeroPage } from './ruta-actual-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaActualPasajeroPageRoutingModule
  ],
  declarations: [RutaActualPasajeroPage]
})
export class RutaActualPasajeroPageModule {}
