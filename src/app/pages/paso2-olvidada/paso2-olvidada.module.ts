import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Paso2OlvidadaPageRoutingModule } from './paso2-olvidada-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Paso2OlvidadaPage } from './paso2-olvidada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatInputModule,
    Paso2OlvidadaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Paso2OlvidadaPage]
})
export class Paso2OlvidadaPageModule {}
