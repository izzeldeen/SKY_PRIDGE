import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arabicTextWithNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    if (value.trim().length === 0) {
      return null;
    }
    
    
    const isValid = /^[\u0621-\u064A0-9\s\u060C\u061B\u061F!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/.test(value); 
    return isValid ? null : { arabicTextWithNumbers: true };
  };
}

export function englishTextWithNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    if (value.trim().length === 0) {
      return null;
    }

    const isValid = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/.test(value); // English letters, numbers, spaces, and common special characters
    return isValid ? null : { englishTextWithNumbers: true };
  };
}
