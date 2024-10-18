import { EMPTY, of } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Location } from '@angular/common';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FicheComponent } from './fiche.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../app-material.module';

describe('FicheComponent - Create', () => {
  let component: FicheComponent;
  let fixture: ComponentFixture<FicheComponent>;
  let consumerServiceSpy: jasmine.SpyObj<ConsumerService> =
    jasmine.createSpyObj('ConsumerService', ['get', 'update', 'create']);
  let locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj('Location', [
    'back',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AppMaterialModule, ReactiveFormsModule, FicheComponent],
    providers: [
        { provide: ConsumerService, useValue: consumerServiceSpy },
        { provide: Location, useValue: locationSpy },
        provideHttpClient(),
        provideNoopAnimations(),
    ],
}).compileComponents();

    fixture = TestBed.createComponent(FicheComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call consumerService.create when id is not provided and form is valid', () => {
    consumerServiceSpy.create.and.returnValue(EMPTY);

    // Set valid form values
    component['consumerForm'].setValue({
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890',
      email: 'john@doe.fr',
    });

    component.onSubmit();

    expect(consumerServiceSpy.update).not.toHaveBeenCalled();
    expect(consumerServiceSpy.create).toHaveBeenCalled();
  });

  it('should navigate back when cancel is called', () => {
    component.cancel();
    expect(locationSpy.back).toHaveBeenCalled();
  });
});

describe('FicheComponent - Update', () => {
  let component: FicheComponent;
  let fixture: ComponentFixture<FicheComponent>;
  let consumerServiceSpy: jasmine.SpyObj<ConsumerService> =
    jasmine.createSpyObj('ConsumerService', ['get', 'update', 'create']);
  let locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj('Location', [
    'back',
  ]);

  const consumerData = {
    civility: 'Mr',
    firstname: 'John',
    lastname: 'Doe',
    phone: '1234567890',
    email: 'john.doe@example.com',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AppMaterialModule, ReactiveFormsModule, FicheComponent],
    providers: [
        { provide: ConsumerService, useValue: consumerServiceSpy },
        { provide: Location, useValue: locationSpy },
        provideHttpClient(),
        provideNoopAnimations(),
    ],
}).compileComponents();

    fixture = TestBed.createComponent(FicheComponent);
    fixture.componentRef.setInput('id', 1);
    component = fixture.componentInstance;
    consumerServiceSpy.get.and.returnValue(of(consumerData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call consumerService.get and patchValue when id is provided', () => {
    expect(consumerServiceSpy.get).toHaveBeenCalledWith(1);
    expect(component['consumerForm'].getRawValue()).toEqual(consumerData);
  });

  it('should call consumerService.update when id is provided and form is valid', () => {
    consumerServiceSpy.update.and.returnValue(EMPTY);
    consumerServiceSpy.get.and.returnValue(
      of({
        id: 1,
        civility: 'Mr',
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        email: 'john@doe.fr',
      })
    );

    // Set valid form values
    component['consumerForm'].setValue({
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890',
      email: 'john@doe.fr',
    });

    component.onSubmit();

    expect(consumerServiceSpy.update).toHaveBeenCalled();
    expect(consumerServiceSpy.create).not.toHaveBeenCalled();
  });

  it('should navigate back when cancel is called', () => {
    component.cancel();
    expect(locationSpy.back).toHaveBeenCalled();
  });
});
