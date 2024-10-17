import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './login/authentication.guard';
import { FicheComponent } from './consumer/fiche/fiche.component';
import { ListComponent } from './consumer/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'consumers',
    component: ListComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'consumers/create',
    component: FicheComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'consumers/:id',
    component: FicheComponent,
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
