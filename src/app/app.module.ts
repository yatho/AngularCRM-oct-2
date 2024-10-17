import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppMaterialModule } from './app-material.module';
import { DummyComponent } from './component/dummy/dummy.component';
import { HelpComponent } from './component/help/help.component';
import { HomeComponent } from './home/home.component';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { jwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { PhonePipe } from './common/phone.pipe';
import { FicheComponent } from './consumer/fiche/fiche.component';
import { ListComponent } from './consumer/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
    HomeComponent,
    PhonePipe,
    FicheComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([jwtInterceptorInterceptor]),
      withFetch()
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
