import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';
import { TipoDocumentoFormComponent } from './tipo-documento-form/tipo-documento-form.component';

@NgModule({
  declarations: [TipoDocumentoListComponent, TipoDocumentoFormComponent],
  imports: [CommonModule],
})
export class TipoDocumentoModule {}
