import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TipoDocumentoFormComponent } from './tipo-documento-form.component';

describe('TipoDocumentoFormComponent', () => {
  let component: TipoDocumentoFormComponent;
  let fixture: ComponentFixture<TipoDocumentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDocumentoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDocumentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
