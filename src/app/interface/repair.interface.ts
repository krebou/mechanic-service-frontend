import { Vehicle } from './vehicle.interface';
import { FormArray, FormControl } from '@angular/forms';

export interface RepairPart {
    name: string;
    priceBuyNetto: number;
    priceNetto: number;
    priceBrutto: number;
    count: number;
    tax: number;
}

export interface Repair {
    id?: string;
    type: string;
    status: string;
    mileage: number;
    vehicleId: string;
    vehicle?: Vehicle;
    partsList: RepairPart[];
    notice?: string;
    costs?: RepairSummaryCost;
    createdAt?: number;
    updatedAt?: number;
}

export interface RepairSummaryCost {
    countAll: number;
    priceNettoAll: number | string;
    priceBruttoAll: number | string;
    taxAll: number | string;
}

export interface RepairPartFormGroup {
    name: FormControl<string>;
    count: FormControl<number>;
    tax: FormControl<number>;
    priceBuyNetto: FormControl<number>;
    priceNetto: FormControl<number>;
    priceBrutto: FormControl<number>;
}

export interface RepairCostsFormGroup {
    parts: FormArray;
}
