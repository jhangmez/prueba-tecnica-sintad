import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/auth/register/register.routes').then(
        (m) => m.REGISTER_ROUTES
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'entidades',
        loadChildren: () =>
          import('./modules/entidad/entidad.routes').then(
            (m) => m.ENTIDAD_ROUTES
          ),
      },
      {
        path: 'tipos-contribuyente',
        loadChildren: () =>
          import('./modules/tipo-contribuyente/tipo-contribuyente.routes').then(
            (m) => m.TIPO_CONTRIBUYENTE_ROUTES
          ),
      },
      {
        path: 'tipos-documento',
        loadChildren: () =>
          import('./modules/tipo-documento/tipo-documento.routes').then(
            (m) => m.TIPO_DOCUMENTO_ROUTES
          ),
      },

      { path: '', redirectTo: '/entidades', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/entidades' },
];
