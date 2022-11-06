import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { RutaActualPasajeroPage } from './ruta-actual-pasajero.page';

describe('RutaActualPasajeroPage', () => {
  let component: RutaActualPasajeroPage;
  let fixture: ComponentFixture<RutaActualPasajeroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaActualPasajeroPage ],
      imports: [IonicModule.forRoot()],
      providers: [Storage, SQLite, Geolocation]
    }).compileComponents();

    fixture = TestBed.createComponent(RutaActualPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
