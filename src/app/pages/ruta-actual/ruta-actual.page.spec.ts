import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { RutaActualPage } from './ruta-actual.page';

describe('RutaActualPage', () => {
  let component: RutaActualPage;
  let fixture: ComponentFixture<RutaActualPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaActualPage ],
      imports: [IonicModule.forRoot()],
      providers: [Storage, SQLite, Geolocation]
    }).compileComponents();

    fixture = TestBed.createComponent(RutaActualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
