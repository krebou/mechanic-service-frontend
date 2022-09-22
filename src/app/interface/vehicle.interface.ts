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
