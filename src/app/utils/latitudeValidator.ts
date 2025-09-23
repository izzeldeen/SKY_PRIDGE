import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator function to validate latitude
export function latitudeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const latitudePattern = /^-?((90(\.0+)?)|([0-8]?\d(\.\d+)?))$/;

    if (control.value && !latitudePattern.test(control.value)) {
      return { 'invalidLatitude': { value: control.value } };
    }
    return null;
  };
}
