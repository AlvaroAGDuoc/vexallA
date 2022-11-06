import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ModificarPerfilPage } from './modificar-perfil.page';

describe('ModificarPerfilPage', () => {
  let component: ModificarPerfilPage;
  let fixture: ComponentFixture<ModificarPerfilPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPerfilPage ],
      imports: [IonicModule.forRoot()],
      providers: [Storage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
