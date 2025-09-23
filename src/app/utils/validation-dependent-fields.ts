import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export function conditionalRequiredValidator(dependentСontrolNames: string[]): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const parent = control.parent;

    if (!parent) {
      return null;
    }

   dependentСontrolNames.forEach(name => {
      const controlToCheck = parent.get(name);
      if (controlToCheck) {
        if (control.value === true) {
          controlToCheck.setValidators([Validators.required]);
        } else {
          controlToCheck.clearValidators();
        }
        controlToCheck.updateValueAndValidity();
      }
    });

    return null;
  };
}