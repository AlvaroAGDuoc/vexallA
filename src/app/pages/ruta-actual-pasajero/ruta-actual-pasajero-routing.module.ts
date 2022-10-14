import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutaActualPasajeroPage } from './ruta-actual-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: RutaActualPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaActualPasajeroPageRoutingModule {}
