import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_URL } from '../../environments/environment';
import { REPAIRS, USERS, VEHICLES } from '../../mocks/users-data';
import { Repair } from '../interface/repair.interface';
import { User } from '../interface/user.interface';
import { getAllByCreatedAt } from '../../mocks/helpers';

describe('UsersService', () => {
    let service: UsersService;
    let httpTestingController: HttpTestingController;

    const apiBaseUrl = API_URL;

    const user = USERS[0];
    const id = String(user.id);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UsersService],
        });
        service = TestBed.inject(UsersService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should insert new user data', () => {
        const _id = '623982a816b554bda9b9ab22';

        const newUser: User = {
            firstname: 'Marian',
            lastname: 'Lowerton',
            email: 'sstx.enter@gmail.com',
            role: 'admin',
            status: 'active',
        };

        service.setUser(newUser).subscribe((response) => {
            expect(response.id).toEqual(_id);
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/user`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newUser);

        req.flush({
            id: _id,
        });
    });

    it('should update user data', () => {
        const updated_data: Partial<User> = {
            id,
            firstname: 'Adrian',
            role: 'mechanic',
        };
        service.updateUser(updated_data).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.updated).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/user`);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(updated_data);

        req.flush({ updated: true });
    });

    it('should delete user ', () => {
        service.deleteUser(id).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.deleted).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${apiBaseUrl}/v1/user/${id}`);
        expect(req.request.method).toEqual('DELETE');

        req.flush({ deleted: true });
    });

    it('should find all users', () => {
        service.getAllUsers().subscribe((response) => {
            expect(response).toBeTruthy();

            expect(response.data.length).toBe(USERS.length);
            expect(response.count).toBe(USERS.length);
        });

        const req = httpTestingController.expectOne(
            (req) => req.url == `${apiBaseUrl}/v1/user/all`
        );

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('page')).toEqual('1');
        expect(req.request.params.get('per_page')).toEqual('25');
        expect(req.request.params.get('sort')).toEqual('ASC');
        expect(req.request.params.get('orderby')).toEqual('');
        expect(req.request.params.get('where')).toBeFalsy();

        req.flush({
            count: USERS.length,
            page: 1,
            per_page: 25,
            sort: 'ASC',
            isNextPage: false,
            data: USERS,
        });
    });

    it('should find clients with params', () => {
        const data = getAllByCreatedAt<User>(USERS, 42424424).slice(1, 1);

        service
            .getAllUsers(2, 1, 'desc', 'createdAt', {
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
            (req) => req.url == `${apiBaseUrl}/v1/user/all`
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
