import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { EntidadService } from '../entidad.service';
import { TipoDocumentoService } from '../../tipo-documento/tipo-documento.service';
import { TipoContribuyenteService } from '../../tipo-contribuyente/tipo-contribuyente.service';

import { EntidadFormComponent } from './entidad-form.component';
import { Entidad } from '../../../shared/models/entidad.model';

describe('EntidadFormComponent', () => {
  let component: EntidadFormComponent;
  let fixture: ComponentFixture<EntidadFormComponent>;

  beforeEach(async () => {
    const mockEntidadService = {
      createEntidad: (entidad: any) => of({}),
      updateEntidad: (id: number, entidad: any) => of({}),
      getEntidadById: (id: number) => of({}),
    };
    const mockTipoDocumentoService = {
      getAllTiposDocumento: () => of([]),
    };
    const mockTipoContribuyenteService = {
      getAllTiposContribuyente: () => of([]),
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],

      declarations: [EntidadFormComponent],

      providers: [
        { provide: EntidadService, useValue: mockEntidadService },
        { provide: TipoDocumentoService, useValue: mockTipoDocumentoService },
        {
          provide: TipoContribuyenteService,
          useValue: mockTipoContribuyenteService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() on editing', () => {
    spyOn(component, 'loadTiposDocumento');
    spyOn(component, 'loadTiposContribuyente');

    component.ngOnInit();

    expect(component.loadTiposDocumento).toHaveBeenCalled();
    expect(component.loadTiposContribuyente).toHaveBeenCalled();
  });

  it('should call createEntidad() on submit and not isEditing', () => {
    const entidadService = TestBed.inject(EntidadService);
    const spyCreateEntidad = spyOn(
      entidadService,
      'createEntidad'
    ).and.callThrough();

    component.onSubmit();

    expect(spyCreateEntidad).toHaveBeenCalled();
  });
});
