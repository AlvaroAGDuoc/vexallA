import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ContrasenaOlvidadaPage } from './contrasena-olvidada.page';

describe('ContrasenaOlvidadaPage', () => {
  let component: ContrasenaOlvidadaPage;
  let fixture: ComponentFixture<ContrasenaOlvidadaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasenaOlvidadaPage ],
      imports: [IonicModule.forRoot()],
      providers: [SQLite, Storage]
    }).compileComponents();

    fixture = TestBed.createComponent(ContrasenaOlvidadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
