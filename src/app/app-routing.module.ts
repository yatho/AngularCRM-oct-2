import { Routes } from '@angular/router';

import { authenticationGuard } from './login/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [authenticationGuard],
  },
  {
    path: 'consumers',
    loadComponent: () =>
      import('./consumer/list/list.component').then((m) => m.ListComponent),
    canActivate: [authenticationGuard],
  },
  {
    path: 'consumers/create',
    loadComponent: () =>
      import('./consumer/fiche/fiche.component').then((m) => m.FicheComponent),
    canActivate: [authenticationGuard],
  },
  {
    path: 'consumers/:id',
    loadComponent: () =>
      import('./consumer/fiche/fiche.component').then((m) => m.FicheComponent),
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: 'home' },
];
