import { TestBed } from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

import { ApiCamaraService } from './api-camara.service';

describe('ApiCamaraService', () => {
  let service: ApiCamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Camera]
    });
    service = TestBed.inject(ApiCamaraService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
