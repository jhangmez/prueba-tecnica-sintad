import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoListComponent } from './tipo-documento-list.component';

describe('TipoDocumentoListComponent', () => {
  let component: TipoDocumentoListComponent;
  let fixture: ComponentFixture<TipoDocumentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDocumentoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoDocumentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
