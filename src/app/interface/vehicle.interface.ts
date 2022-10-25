import { FormControl, FormGroup } from '@angular/forms';

export interface Vehicle {
    type: string;
    id?: string;
    plate: string;
    mark: string;
    model: string;
    year: number;
    vin: string;
    clientId: string;
    createdAt?: number;
    updatedAt?: number;
    engine?: {
        engineType: string;
        engineSize: number | null;
        enginePower: number | null;
    };
}

export interface AddVehicleForm {
    type: FormControl<string>;
    plate: FormControl<string>;
    mark: FormControl<string>;
    model: FormControl<string>;
    year: FormControl<number>;
    vin: FormControl<string>;
    clientId: FormControl<string>;
    engine: FormGroup<{
        engineType: FormControl<string>;
        engineSize: FormControl<number | null>;
        enginePower: FormControl<number | null>;
    }>;
}
