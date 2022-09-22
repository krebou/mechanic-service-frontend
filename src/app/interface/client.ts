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
