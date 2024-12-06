import { Routes } from '@angular/router';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';
import { TipoDocumentoFormComponent } from './tipo-documento-form/tipo-documento-form.component';

export const TIPO_DOCUMENTO_ROUTES: Routes = [
  { path: '', component: TipoDocumentoListComponent },
  { path: 'nuevo', component: TipoDocumentoFormComponent },
  { path: 'editar/:id', component: TipoDocumentoFormComponent },
];
