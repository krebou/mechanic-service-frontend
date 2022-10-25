import { TestBed } from '@angular/core/testing';

import { VehiclesService } from './vehicles.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_URL } from '../../environments/environment';
import { VEHICLES } from '../../mocks/users-data';
import { Vehicle } from '../interface/vehicle.interface';
import { getAllByCreatedAt } from '../../mocks/helpers';

describe('VehicleService', () => {
    let service: VehiclesService;
    let httpTestingController: HttpTestingController;

    const apiBaseUrl = API_URL;

    const vehicle = VEHICLES[0];
    const id = String(vehicle.id);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [VehiclesService],
        });
        service = TestBed.inject(VehiclesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should find a vehicle by id', () => {
        service.getVehicle(id).subscribe((response) => {
            expect(response).toEqual(vehicle);
            expect(response.id).toBe(id);
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/vehicle/${id}`);
        expect(req.request.method).toEqual('GET');

        req.flush(vehicle);
    });

    it('should insert new vehicle data', () => {
        const _id = '623982a816b554bda9b9b44d';

        const newVehicle: Vehicle = {
            id: '623982a816b554bda9ab9b91',
            type: 'vehicle',
            plate: 'FSD 66021',
            mark: 'Opel',
            model: 'Vectra III',
            year: 2001,
            vin: 'VVVVV5NZ8W0123333',
            clientId: '623982a816b554bda9b9b811',
            createdAt: 1666184013455,
            updatedAt: 1666184013455,
            engine: {
                engineType: 'DIESEL',
                engineSize: 2,
                enginePower: 85,
            },
        };

        service.setVehicle(newVehicle).subscribe((response) => {
            expect(response.id).toEqual(_id);
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/vehicle/`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newVehicle);

        req.flush({
            id: _id,
        });
    });

    it('should update vehicle data', () => {
        const updated_data = {
            id,
            mark: 'OPEL',
            engine: {
                engineType: 'PETROL',
                enginePower: 100,
                engineSize: 1.1,
            },
        };
        service.updateVehicle(updated_data).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.updated).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/vehicle/`);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(updated_data);

        req.flush({ updated: true });
    });

    it('should delete vehicle data', () => {
        service.deleteVehicle(id).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.deleted).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/vehicle/${id}`);
        expect(req.request.method).toEqual('DELETE');

        req.flush({ deleted: true });
    });

    it('should find all vehicles', () => {
        service.getAllVehicles().subscribe((response) => {
            expect(response).toBeTruthy();

            expect(response.data.length).toBe(VEHICLES.length);
            expect(response.count).toBe(VEHICLES.length);
        });

        const req = httpTestingController.expectOne(
            (req) => req.url == `${apiBaseUrl}/v1/vehicle/all`
        );

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('page')).toEqual('1');
        expect(req.request.params.get('per_page')).toEqual('25');
        expect(req.request.params.get('sort')).toEqual('ASC');
        expect(req.request.params.get('orderby')).toEqual('');
        expect(req.request.params.get('where')).toBeFalsy();

        req.flush({
            count: VEHICLES.length,
            page: 1,
            per_page: 25,
            sort: 'ASC',
            isNextPage: false,
            data: VEHICLES.slice(0, 25),
        });
    });

    it('should find vehicles with params', () => {
        const data = getAllByCreatedAt<Vehicle>(VEHICLES, 42424424).slice(1, 1);

        service
            .getAllVehicles(2, 1, 'desc', 'createdAt', {
                createdAt: {
                    $gte: 42424424,
                },
            })
            .subscribe((response) => {
                expect(response).toBeTruthy();

                expect(response.count).toBe(data.length);
                expect(response.page).toBe(2);
                expect(response.per_page).toBe(1);
                expect(response.sort).toBe('DESC');
                expect(response.isNextPage).toBeTrue();
                expect(response.data.length).toBe(data.length);
                expect(response.data).toEqual(data);
            });

        const req = httpTestingController.expectOne(
            (req) => req.url == `${apiBaseUrl}/v1/vehicle/all`
        );

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('page')).toEqual('2');
        expect(req.request.params.get('per_page')).toEqual('1');
        expect(req.request.params.get('sort')).toEqual('DESC');
        expect(req.request.params.get('orderby')).toEqual('createdAt');
        expect(req.request.params.get('where[createdAt][$gte]')).toEqual('42424424');

        req.flush({
            count: data.length,
            page: 2,
            per_page: 1,
            sort: 'DESC',
            isNextPage: true,
            data: data,
        });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
