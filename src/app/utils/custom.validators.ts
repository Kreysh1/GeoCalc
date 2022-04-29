import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidation{

  static isYoungerWithParam(limit: number){
    return (control: AbstractControl) =>{
      const value = control.value;
      if (value < limit){
        return {isYounger:true};
      }
      return null;
    }
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
  
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
  
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
  const password: string | null = control.get('password')?.value; // get password from our password form control
  const confirm: string | null = control.get('confirm')?.value; // get password from our confirmPassword form control
  // compare is the password math
  if (password !== confirm) {
    // if they don't match, set an error in our confirmPassword form control
    return ({ NoPasswordMatch: true });
  }
  return null;
}


}