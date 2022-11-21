import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: {get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy}



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new ApiService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('metodo getUser(), debe traer al usuario pepito', (done) => {
    const fakeUser = {
      "id": 1,
      "nombre": "pepito",
      "clave": "pepito123",
      "id_rol": 1
    }
    httpClientSpy.get.and.returnValue(of(fakeUser))
    service.getUser(1).subscribe(user => {
      expect(user.nombre).toBe('pepito');
      done();
    })
  })


  it('metodo getUsers(), debe traer a todos los usuarios', (done) => {
    const fakeUsers = [{
      "id": 1,
      "nombre": "pepito",
      "clave": "pepito123",
      "id_rol": 1
    },
    {
      "id": 2,
      "nombre": "luis",
      "clave": "luis123",
      "id_rol": 2
    }, {
      "id": 3,
      "nombre": "ejeje",
      "clave": "ejeje123",
      "id_rol": 1
    }]
    httpClientSpy.get.and.returnValue(of(fakeUsers));
    service.getUsers().subscribe(res => {
      expect(res.length).toBe(3)
      done()
    })
  })

  it('metodo createUser(), debe registrar al usuario nuevo', (done) => {

    const usuarioNuevo = {
      "id": 5,
      "nombre": "Ejemplo",
      "clave": "ejemplo123",
      "id_rol": 1
    }

    httpClientSpy.post.and.returnValue(of(usuarioNuevo))

    service.createUser(usuarioNuevo).subscribe(res => {
      expect(res).toEqual(usuarioNuevo)
      done()
    })
  })

  it('metodo updateUser(), debe actualizar al usuario', (done) => {
    const usuario = {
      "id": 4,
      "nombre": "Ejemplo",
      "clave": "ejemplo123",
      "id_rol": 1
    }

    const usuarioActualizado = {
      "id": 4,
      "nombre": "Juan",
      "clave": "juan123",
      "id_rol": 1
    }

    httpClientSpy.put.and.returnValue(of(usuarioActualizado))

    service.updateUser(usuario.id, usuarioActualizado).subscribe(res => {
      expect(res).toEqual(usuarioActualizado)
      done()
    })
  })

  it('metodo deleteUser(), debe eliminar al usuario', (done) => {
    const usuarioEliminar = {
      "id": 4,
      "nombre": "Ejemplo",
      "clave": "ejemplo123",
      "id_rol": 1
    }

    httpClientSpy.delete.and.returnValue(of(''))

    service.deleteUser(usuarioEliminar.id).subscribe(res => {
      expect(res).toBe('');
      done()
    })
  })

  it('el metodo getAutos(), retorna todos los autos', (done) => {

    const autos = [
      {
        "patente": "FF-HH-22",
        "id_usuario": 1,
        "marca": "Audi"
      },
      {
        "patente": "GG-11-RR",
        "id_usuario": 1,
        "marca": "BMW"
      }
    ]

    httpClientSpy.get.and.returnValue(of(autos))

    service.getAutos().subscribe(res => {
      expect(res).toEqual(autos)
      done()
    })
  })
});
