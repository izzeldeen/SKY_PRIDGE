import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator function to validate longitude
export function longitudeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const longitudePattern = /^-?((180(\.0+)?)|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/;

    if (control.value && !longitudePattern.test(control.value)) {
      return { 'invalidLongitude': { value: control.value } };
    }
    return null;
  };
}
