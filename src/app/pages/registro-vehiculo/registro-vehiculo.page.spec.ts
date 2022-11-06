import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { RegistroVehiculoPage } from './registro-vehiculo.page';

describe('RegistroVehiculoPage', () => {
  let component: RegistroVehiculoPage;
  let fixture: ComponentFixture<RegistroVehiculoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroVehiculoPage ],
      imports: [IonicModule.forRoot()],
      providers: [SQLite, Storage]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
