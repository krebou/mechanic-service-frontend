import { FormControl } from '@angular/forms';

export interface Client {
    id?: string;
    name: string;
    type: string;
    taxNumber?: string;
    phone: string;
    email: string;
    gender?: string;
    street: string;
    city: string;
    zipCode: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface ClientFormGroup {
    name: FormControl<string | null>;
    type: FormControl<string>;
    taxNumber: FormControl<string | null>;
    phone: FormControl<string | null>;
    email: FormControl<string | null>;
    gender: FormControl<string>;
    street: FormControl<string | null>;
    city: FormControl<string | null>;
    zipCode: FormControl<string | null>;
}
