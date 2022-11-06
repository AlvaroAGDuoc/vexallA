import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { VerRecorridoPage } from './ver-recorrido.page';

describe('VerRecorridoPage', () => {
  let component: VerRecorridoPage;
  let fixture: ComponentFixture<VerRecorridoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRecorridoPage ],
      imports: [IonicModule.forRoot()],
      providers: [Storage, Geolocation, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(VerRecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
