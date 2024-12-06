import { Routes } from '@angular/router';
import { TipoContribuyenteListComponent } from './tipo-contribuyente-list/tipo-contribuyente-list.component';
import { TipoContribuyenteFormComponent } from './tipo-contribuyente-form/tipo-contribuyente-form.component';

export const TIPO_CONTRIBUYENTE_ROUTES: Routes = [
  { path: '', component: TipoContribuyenteListComponent },
  { path: 'nuevo', component: TipoContribuyenteFormComponent },
  { path: 'editar/:id', component: TipoContribuyenteFormComponent },
];
