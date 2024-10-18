import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { AbstractControl } from '@angular/forms';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HelpComponent],
}).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false for isError when field is undefined', () => {
    component.field = undefined;
    expect(component.isError()).toBeFalse();
  });

  it('should return false for isError when field is valid and not touched', () => {
    component.field = {
      touched: false,
      valid: true,
    } as AbstractControl<string>;
    expect(component.isError()).toBeFalse();
  });

  // it('should return true for isError when field is invalid and touched', () => {
  //   component.field = {
  //     touched: true,
  //     valid: false,
  //   } as AbstractControl;
  //   expect(component.isError()).toBeTrue();
  // });

  // it('should return an empty array for errors when field is undefined', () => {
  //   component.field = undefined;
  //   expect(component.errors).toEqual([]);
  // });

  // it('should return an empty array for errors when field has no errors', () => {
  //   component.field = {
  //     errors: null,
  //   } as AbstractControl;
  //   expect(component.errors).toEqual([]);
  // });

  // it('should return error messages when field has errors and errorMessages are provided', () => {
  //   component.field = {
  //     errors: { required: true },
  //   } as AbstractControl;
  //   component.errorMessages = { required: 'This field is required' };
  //   expect(component.errors).toEqual(['This field is required']);
  // });

  // it('should return default message when field has errors and errorMessages are not provided', () => {
  //   component.field = {
  //     errors: { required: true },
  //   } as AbstractControl;
  //   component.errorMessages = {};
  //   expect(component.errors).toEqual(['Missing message for required']);
  // });
});
