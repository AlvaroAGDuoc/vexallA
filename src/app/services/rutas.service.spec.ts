import { TestBed } from '@angular/core/testing';

import { Rutas } from './rutas.service';

describe('Rutas', () => {
  let service: Rutas;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Rutas]
    });
    service = TestBed.inject(Rutas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
