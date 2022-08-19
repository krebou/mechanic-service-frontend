import {UserInterface} from "../interface/user.interface";
import {Validators} from "@angular/forms";
import {birthdayPattern, emailValidator, genderPattern, namePattern, phonePattern} from "./form.validator";

const required = Validators.required;

export const userFormGroup = ( user?: UserInterface | any ) => {

  return {
    email: [ user?.email, [ required, emailValidator() ]],
    role: [ user?.role, [ required ]],
    status: [ user?.status, [ required  ]],
    password: [ user?.password, [ required]],
    passwordRepeat: [ user?.passwordRepeat, [required]],
    firstname: [ user?.firstname, [ required, namePattern ] ],
    lastname: [ user?.firstname, [ namePattern ] ],
    gender: [ user?.gender, [ required, genderPattern ] ],
    phone: [ user?.phone, [ phonePattern ] ],
    street: [ user?.street, [ namePattern ] ],
    city: [ user?.city, [ namePattern ] ],
    zipCode: [ user?.zipCode, [ namePattern ] ],
    birthday: [ user?.birthday, [ birthdayPattern ]]
  }

}
