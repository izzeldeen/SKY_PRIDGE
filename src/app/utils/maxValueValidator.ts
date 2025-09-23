import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxValueValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control?.value;

    // Allow null or empty (leave to required validator if needed)
    if (value == null || value === '') return null;

    // Check for whitespace in strings
    if (typeof value === 'string' && value.trim().length === 0) {
      return { maxValue: true };
    }

    // Convert to number if possible
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return { notANumber: true };
    }

    // Check max value
    if (numericValue > max) {
      return { maxValue: { max, actual: numericValue } };
    }

    return null;
  };
}
