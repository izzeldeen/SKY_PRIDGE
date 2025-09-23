import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator function to validate file name with extension
export function fileNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fileName = control.value;
    
    // If the file name is empty, it's considered valid.
    if (!fileName) {
      return null;
    }

    // Check if the file name contains a valid extension.
    if (!/\..+$/.test(fileName)) {
      return { 'invalidExtension': { value: control.value } };
    }

    return null; // Return null if validation passes
  };
}
