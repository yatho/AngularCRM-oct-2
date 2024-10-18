import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideHttpClient } from '@angular/common/http';
import { AppMaterialModule } from './app-material.module';

@Component({
    selector: 'crm-login',
    template: '',
    standalone: true,
    imports: [MatToolbarModule, AppMaterialModule],
})
class MockComponent {}

@Component({
    selector: 'crm-dummy',
    template: '',
    standalone: true,
    imports: [MatToolbarModule, AppMaterialModule],
})
class DummyMockComponent {
  label = input();
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterModule.forRoot([]), MatToolbarModule, AppMaterialModule, MockComponent, DummyMockComponent, AppComponent],
    providers: [provideHttpClient()],
}).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angularCRM-19'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angularCRM-19');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'angularCRM-19'
    );
  });
});
