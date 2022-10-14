import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Paso2OlvidadaPage } from './paso2-olvidada.page';

const routes: Routes = [
  {
    path: '',
    component: Paso2OlvidadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Paso2OlvidadaPageRoutingModule {}
