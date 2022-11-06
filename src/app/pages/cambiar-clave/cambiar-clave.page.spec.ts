import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { CambiarClavePage } from './cambiar-clave.page';

describe('CambiarClavePage', () => {
  let component: CambiarClavePage;
  let fixture: ComponentFixture<CambiarClavePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarClavePage ],
      imports: [IonicModule.forRoot()],
      providers: [SQLite, Storage]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
