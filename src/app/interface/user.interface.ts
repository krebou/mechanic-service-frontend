import { FormControl } from '@angular/forms';

export interface User {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    status: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface AddUserForm {
    firstname: FormControl<string>;
    lastname: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<string>;
    status: FormControl<string>;
}

export interface PasswordUserForm {
    password: FormControl<string>;
    password_repeat: FormControl<string>;
}
