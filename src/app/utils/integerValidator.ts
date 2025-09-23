import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator function to allow only integer values
export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const integerPattern = /^\d+$/;

    if (control.value && !integerPattern.test(control.value)) {
      return { 'integerError': { value: control.value } };
    }
    return null;
  };
}
