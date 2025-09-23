import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    

    if (!pattern.test(password)) {
      return { 'invalidPassword': true };
    }

    return null;
  };
}