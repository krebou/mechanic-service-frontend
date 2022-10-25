import { TestBed } from '@angular/core/testing';

import { RepairsService } from './repairs.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_URL } from '../../environments/environment';
import { REPAIRS, VEHICLES } from '../../mocks/users-data';
import { Repair } from '../interface/repair.interface';
import { getAllByCreatedAt } from '../../mocks/helpers';

describe('RepairsService', () => {
    let service: RepairsService;
    let httpTestingController: HttpTestingController;

    const apiBaseUrl = API_URL;

    const repair = REPAIRS[0];
    const id = String(repair.id);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RepairsService],
        });
        service = TestBed.inject(RepairsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should find a repair by id', () => {
        service.getRepair(id).subscribe((response) => {
            expect(response).toEqual(repair);
            expect(response.id).toBe(id);
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/repair/${id}`);
        expect(req.request.method).toEqual('GET');

        req.flush(repair);
    });

    it('should insert new repair data', () => {
        const _id = '623982a816b554bda9b9ab22';

        const newRepair: Repair = {
            type: 'repair',
            status: 'string',
            mileage: 91525,
            vehicleId: '623982a816b554bda9a2b411',
            vehicle: VEHICLES[0],
            partsList: [
                {
                    name: 'Wymiana oleju',
                    priceBuyNetto: 100,
                    priceNetto: 100,
                    priceBrutto: 123,
                    count: 1,
                    tax: 23,
                },
                {
                    name: 'Olej',
                    priceBuyNetto: 200,
                    priceNetto: 200,
                    priceBrutto: 246,
                    count: 1,
                    tax: 23,
                },
            ],
            notice: '',
            costs: {
                countAll: 2,
                priceNettoAll: 300,
                priceBruttoAll: 369,
                taxAll: 69,
            },
        };

        service.setRepair(newRepair).subscribe((response) => {
            expect(response.id).toEqual(_id);
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/repair`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newRepair);

        req.flush({
            id: _id,
        });
    });

    it('should update repair data', () => {
        const updated_data: Partial<Repair> = {
            id,
            type: 'clima',
            mileage: 100000,
        };
        service.updateRepair(updated_data).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.updated).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/repair/`);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(updated_data);

        req.flush({ updated: true });
    });

    it('should delete repair ', () => {
        service.deleteRepair(id).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.deleted).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/repair/${id}`);
        expect(req.request.method).toEqual('DELETE');

        req.flush({ deleted: true });
    });

    it('should find all repairs', () => {
        service.getAllRepairs().subscribe((response) => {
            expect(response).toBeTruthy();

            expect(response.data.length).toBe(REPAIRS.length);
            expect(response.count).toBe(REPAIRS.length);
        });

        const req = httpTestingController.expectOne(
            (req) => req.url == `${apiBaseUrl}/v1/repair/all`
        );

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('page')).toEqual('1');
        expect(req.request.params.get('per_page')).toEqual('25');
        expect(req.request.params.get('sort')).toEqual('ASC');
        expect(req.request.params.get('orderby')).toEqual('');
        expect(req.request.params.get('where')).toBeFalsy();

        req.flush({
            count: REPAIRS.length,
            page: 1,
            per_page: 25,
            sort: 'ASC',
            isNextPage: false,
            data: REPAIRS,
        });
    });

    it('should find clients with params', () => {
        const data = getAllByCreatedAt<Repair>(REPAIRS, 42424424).slice(1, 1);

        service
            .getAllRepairs(2, 1, 'desc', 'createdAt', {
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
            (req) => req.url == `${apiBaseUrl}/v1/repair/all`
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
