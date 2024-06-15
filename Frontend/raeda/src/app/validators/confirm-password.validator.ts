import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ConfirmPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.value.password === control.value.confirmPassword
    ? null
    : { passwordNotMatch: true };
}
