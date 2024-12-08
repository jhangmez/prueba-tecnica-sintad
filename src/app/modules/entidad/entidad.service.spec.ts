import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EntidadService } from './entidad.service';
import { TipoDocumento } from '../../shared/models/tipo-documento.model';
import { TipoContribuyente } from '../../shared/models/tipo-contribuyente.model';
import { HttpClient } from '@angular/common/http';
import { Entidad } from '../../shared/models/entidad.model';

describe('EntidadService', () => {
  let service: EntidadService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntidadService],
    });
    service = TestBed.inject(EntidadService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all entidades', () => {
    const mockEntidades: Entidad[] = [
      // mock
    ];

    service.getAllEntidades().subscribe((entidades) => {
      expect(entidades).toEqual(mockEntidades);
    });

    const req = httpMock.expectOne('http://localhost:8080/entidades');
    expect(req.request.method).toBe('GET');
    req.flush(mockEntidades);
  });

  it('should retrieve an entity by id', () => {
    const mockEntidad: Entidad = {
      idEntidad: 1,
      tipoDocumento: {
        idTipoDocumento: 3,
      } as TipoDocumento,
      nroDocumento: '2434767870',
      razonSocial: 'Empresa de Prueba 2008 S.A.C.',
      nombreComercial: 'Prueba Comercial',
      tipoContribuyente: {
        idTipoContribuyente: 2,
      } as TipoContribuyente,
      direccion: 'Calle de Prueba 123',
      telefono: '987654321',
      estado: true,
    };
    const id = 1;

    service.getEntidadById(id).subscribe((entidad) => {
      expect(entidad).toEqual(mockEntidad);
    });

    const req = httpMock.expectOne(`http://localhost:8080/entidades/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEntidad);
  });

  it('should create an entity', () => {
    const mockEntidad: Entidad = {
      idEntidad: 1,
      tipoDocumento: {
        idTipoDocumento: 3,
      } as TipoDocumento,
      nroDocumento: '1434767870',
      razonSocial: 'Empresa de Prueba 2002 S.A.C.',
      nombreComercial: 'Prueba Comercial',
      tipoContribuyente: {
        idTipoContribuyente: 2,
      } as TipoContribuyente,
      direccion: 'Calle de Prueba 123',
      telefono: '987654321',
      estado: true,
    };

    service.createEntidad(mockEntidad).subscribe((entidad) => {
      expect(entidad).toEqual(mockEntidad);
    });

    const req = httpMock.expectOne(`http://localhost:8080/entidades`);
    expect(req.request.method).toBe('POST');
    req.flush(mockEntidad);
  });

  it('should update an entity', () => {
    const mockEntidad: Entidad = {
      idEntidad: 1,
      tipoDocumento: {
        idTipoDocumento: 3,
      } as TipoDocumento,
      nroDocumento: '1234567890',
      razonSocial: 'Empresa de Prueba S.A.C.',
      nombreComercial: 'Prueba Comercial',
      tipoContribuyente: {
        idTipoContribuyente: 2,
      } as TipoContribuyente,
      direccion: 'Calle de Prueba 123',
      telefono: '987654321',
      estado: true,
    };
    const id = 1;

    service.updateEntidad(id, mockEntidad).subscribe((entidad) => {
      expect(entidad).toEqual(mockEntidad);
    });

    const req = httpMock.expectOne(`http://localhost:8080/entidades/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockEntidad);
  });

  it('should delete an entity', () => {
    const id = 1;

    service.deleteEntidad(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:8080/entidades/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
