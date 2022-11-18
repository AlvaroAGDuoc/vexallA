import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ListaVehiculoPage } from './lista-vehiculo.page';

describe('ListaVehiculoPage', () => {
  let component: ListaVehiculoPage;
  let fixture: ComponentFixture<ListaVehiculoPage>;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVehiculoPage ],
      imports: [IonicModule.forRoot()],
      providers: [SQLite, Storage]
    }).compileComponents();

    // fixture = TestBed.createComponent(ListaVehiculoPage);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
