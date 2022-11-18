import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer al usuario 1', (done) => {
    service.getUser(1).subscribe(user => {
      console.log(user);
      expect(user.id).toBe(1);
      done();
    })
  })

  it('Debe traer 3 usuarios', (done) => {
    service.getUsers().subscribe(user => {
      expect(user).toHaveSize(3);
      done();
    })
  })

});
