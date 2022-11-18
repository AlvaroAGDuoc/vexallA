import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

import { BdservicioService } from './bdservicio.service';

describe('BdservicioService', () => {
  let service: BdservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite, Platform ]
    });
    service = TestBed.inject(BdservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
