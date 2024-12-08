import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TipoContribuyenteService } from './tipo-contribuyente.service';

describe('TipoContribuyenteService', () => {
  let service: TipoContribuyenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoContribuyenteService],
    });
    service = TestBed.inject(TipoContribuyenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
