import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutaActualPageRoutingModule } from './ruta-actual-routing.module';

import { RutaActualPage } from './ruta-actual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaActualPageRoutingModule
  ],
  declarations: [RutaActualPage]
})
export class RutaActualPageModule {}
