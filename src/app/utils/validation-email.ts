import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
export function emailValidator(): ValidatorFn 
{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (control: AbstractControl): ValidationErrors | null => 
  {
    const valid = Validators.email(control);
    const value = control.value;
    if (value && valid !== null || value && !emailRegex.test(value)) 
    {
      return { invalidEmail: true };
    }
    return null;
  };
}