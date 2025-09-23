import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
      if(!control?.value) return;

    if(control?.value?.length ===0) return;

    const isWhitespace = (control.value || '').trim().length === 0;
    
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  };
}