import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { BdservicioService } from './bdservicio.service';

describe('BdservicioService', () => {
  let service: BdservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    service = TestBed.inject(BdservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
