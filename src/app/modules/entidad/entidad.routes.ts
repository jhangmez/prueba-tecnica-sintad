import { Routes } from '@angular/router';
import { EntidadListComponent } from './entidad-list/entidad-list.component';
import { EntidadFormComponent } from './entidad-form/entidad-form.component';

export const ENTIDAD_ROUTES: Routes = [
  { path: '', component: EntidadListComponent },
  { path: 'nuevo', component: EntidadFormComponent },
  { path: 'editar/:id', component: EntidadFormComponent },
];
