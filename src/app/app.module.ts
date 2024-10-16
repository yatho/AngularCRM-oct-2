import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppMaterialModule } from './app-material.module';
import { DummyComponent } from './component/dummy/dummy.component';
import { HelpComponent } from './component/help/help.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DummyComponent, HelpComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, AppMaterialModule],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
