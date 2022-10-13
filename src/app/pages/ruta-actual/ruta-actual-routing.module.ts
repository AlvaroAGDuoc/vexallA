import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutaActualPage } from './ruta-actual.page';

const routes: Routes = [
  {
    path: '',
    component: RutaActualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaActualPageRoutingModule {}
