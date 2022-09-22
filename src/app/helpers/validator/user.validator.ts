import { UserInterface } from '../interface/user.interface';
import { Validators } from '@angular/forms';
import {
    birthdayPattern,
    emailValidator,
    genderPattern,
    namePattern,
    phonePattern,
} from './form.validator';

const required = Validators.required;

export const userFormGroup = (user?: UserInterface | any) => {
    return {
        email: [user?.email, [required, emailValidator()]],
        role: [user?.role, [required]],
        status: [user?.status, [required]],
        password: [user?.password, [required]],
        passwordRepeat: [user?.passwordRepeat, [required]],
        firstname: [user?.firstname, [required, namePattern]],
        lastname: [user?.firstname, [namePattern]],
        gender: [user?.gender, [required, genderPattern]],
        phone: [user?.phone, [phonePattern]],
        street: [user?.street, [namePattern]],
        city: [user?.city, [namePattern]],
        zipCode: [user?.zipCode, [namePattern]],
        birthday: [user?.birthday, [birthdayPattern]],
    };
};

export const RegExpPatterns: Patterns = {
    mongoId: new RegExp(/^[a-fA-F0-9]{24}$/),
    plate: new RegExp(/^[- \p{L}\p{N}]*$/iu),
    number: new RegExp(/^[0-9]*$/iu),
    name: new RegExp(/^[- \p{L}\p{N}]*$/iu),
    vin: new RegExp(/^[0-9wertyupasdfghjklzxxcvbnmWERTYUPASDFGHJKLZXCVBNM]{17}$/iu),
    phone: new RegExp(/^[0-9 ()+\-\p{N}]*$/iu),
    gender: new RegExp(/^(male|female|divers)$/i),
    zipCode: new RegExp(/^[0-9- a-zA-Z]*$/iu),
    clientType: new RegExp(/^(personal|business)$/i),
    birthday: new RegExp(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/i),
    yearPattern: new RegExp(/^\d{4}$/i),
    jwt: new RegExp(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/),
};
