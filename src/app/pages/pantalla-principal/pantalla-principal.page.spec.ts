import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { PantallaPrincipalPage } from './pantalla-principal.page';
import { BdservicioService } from 'src/app/services/bdservicio.service';

describe('PantallaPrincipalPage', () => {
  let component: PantallaPrincipalPage;
  let fixture: ComponentFixture<PantallaPrincipalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaPrincipalPage ],
      imports: [IonicModule.forRoot()],
      providers: [Storage, SQLite, ActivatedRoute,BdservicioService]
    }).compileComponents();

    fixture = TestBed.createComponent(PantallaPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });


  
})