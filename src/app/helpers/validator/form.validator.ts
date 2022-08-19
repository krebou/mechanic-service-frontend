import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class FormValidator {

  platePattern = Validators.pattern(new RegExp(/^[\p{L}\p{N}]*$/iu));

  namePattern = Validators.pattern(new RegExp(/^[- \p{L}\p{N}]*$/iu));

  vinPattern = Validators.pattern(new RegExp(/^[0-9wertyupasdfghjklzxxcvbnmWERTYUPASDFGHJKLZXCVBNM]{17}$/iu));

  phonePattern = Validators.pattern(new RegExp(/^[0-9 ()+\-\p{N}]*$/iu));

  genderPattern = Validators.pattern(new RegExp(/^(GENDER_FEMALE|GENDER_MALE|GENDER_DIVERS)$/i));

  birthdayPattern = Validators.pattern(new RegExp(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/i));

  emailValidator = (): ValidatorFn => {
    const nameRe = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$', 'i')
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? null: {email: true };
    };
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.hasError('mustMatch')) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  // getErrorMessage( control: AbstractControl ): string {
  //   if(control.hasError('required'))
  // }


}
