import { Vehicle } from './vehicle.interface';

export interface RepairPart {
    name: string;
    priceBuyNetto: number;
    priceNetto: number;
    priceBrutto: number;
}

export interface Repair {
    id?: string;
    type: string;
    status: string;
    mileage: number;
    vehicleId: string;
    vehicle?: Vehicle;
    partsList: RepairPart[];
    notice?: string[];
    costs?: RepairSummaryCost;
}

export interface RepairSummaryCost {
    countAll: number;
    priceNettoAll: number | string;
    priceBruttoAll: number | string;
    taxAll: number | string;
}
