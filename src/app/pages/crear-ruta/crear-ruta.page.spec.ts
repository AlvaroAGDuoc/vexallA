import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { CrearRutaPage } from './crear-ruta.page';

describe('CrearRutaPage', () => {
  let component: CrearRutaPage;
  let fixture: ComponentFixture<CrearRutaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRutaPage ],
      imports: [IonicModule.forRoot()],
      providers: [SQLite, Storage, Geolocation, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
