import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { PerfilPage } from './perfil.page';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  let usuario = {
    id_usuario: 4,
    nombre_usuario: 'alvaro',
    clave: 'aa123',
    nombre: 'Alvaro',
    apellidos: 'Aguero',
    email: 'alvaro@gmail.com',
    rol_id: '1',
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [IonicModule.forRoot()],
      providers: [Storage, Camera]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Muestra el usuario conectado en el perfil', () => {

    component.storage.set('usuario', usuario);

    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.quitarEstilo nombre_usuario').textContent).toContain('Nombre de usuario: ')

  }) 
});
