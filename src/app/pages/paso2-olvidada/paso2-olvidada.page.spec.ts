import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Paso2OlvidadaPage } from './paso2-olvidada.page';

describe('Paso2OlvidadaPage', () => {
  let component: Paso2OlvidadaPage;
  let fixture: ComponentFixture<Paso2OlvidadaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Paso2OlvidadaPage ],
      imports: [IonicModule.forRoot()],
      providers: [SQLite, Storage]
    }).compileComponents();

    fixture = TestBed.createComponent(Paso2OlvidadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
