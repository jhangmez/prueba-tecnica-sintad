import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContribuyenteListComponent } from './tipo-contribuyente-list.component';

describe('TipoContribuyenteListComponent', () => {
  let component: TipoContribuyenteListComponent;
  let fixture: ComponentFixture<TipoContribuyenteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoContribuyenteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoContribuyenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
