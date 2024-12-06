import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadListComponent } from './entidad-list/entidad-list.component';
import { EntidadFormComponent } from './entidad-form/entidad-form.component';

@NgModule({
  declarations: [EntidadListComponent, EntidadFormComponent],
  imports: [CommonModule],
})
export class EntidadModule {}
