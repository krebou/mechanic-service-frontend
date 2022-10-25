import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { ClientInfoStandaloneComponent } from './client-info.standalone-component';
import {
    MatDialogModule,
    MatFormModule,
    MatProgressSpinnerModule,
} from '../../../../../modules/angular-material/angular-material.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientsService } from '../../../../../services/clients.service';
import { PipesModule } from '../../../../../pipes/pipes.module';
import { CLIENTS } from '../../../../../../mocks/users-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GenderPipe } from '../../../../../pipes/gender.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { API_URL } from '../../../../../../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { ClientFormDialogComponent } from '../../../dialogs/client-form-dialog/client-form-dialog.component';
import { MatTestDialogOpenerModule } from '@angular/material/dialog/testing';
import { MatDialogTitle } from '@angular/material/dialog';

class MatDialogRef {
    close(param: any = {}) {
        return of(param);
    }
}

describe('ClientInfoComponent', () => {
    let component: ClientInfoStandaloneComponent;
    let fixture: ComponentFixture<ClientInfoStandaloneComponent>;
    let el: DebugElement;
    let httpTestingController: HttpTestingController;

    const apiBaseUrl = API_URL;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientFormDialogComponent],
            imports: [
                CommonModule,
                ClientInfoStandaloneComponent,
                PipesModule,
                MatDialogModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                ReactiveFormsModule,
                StoreModule,
                PipesModule,
                MatFormModule,
                MatProgressSpinnerModule,
            ],
            providers: [ClientsService, { provide: Store, useValue: {} }, MatDialogRef],
        }).compileComponents();

        fixture = TestBed.createComponent(ClientInfoStandaloneComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture.detectChanges();

        component.client = CLIENTS[0];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show all data', () => {
        const genderPipe = new GenderPipe();
        const datePipe = new DatePipe('en-US');
        // #name
        const name = el.query(By.css('#bi-tr-name .bi-td')).nativeElement.textContent;
        expect(name).toBe(component.client.name);

        // #phone
        const phone = el.query(By.css('#bi-tr-phone .bi-td')).nativeElement.textContent;
        expect(phone).toBe(component.client.phone);

        // #email
        const email = el.query(By.css('#bi-tr-email .bi-td')).nativeElement.textContent;
        expect(email).toBe(component.client.email);

        // #gender
        const gender = el.query(By.css('#bi-tr-gender .bi-td')).nativeElement.textContent;
        expect(gender).toBe(genderPipe.transform(component.client.gender));

        // #street
        const street = el.query(By.css('#bi-tr-street .bi-td')).nativeElement.textContent;
        expect(street).toBe(component.client.street);

        // #city
        const city = el.query(By.css('#bi-tr-city .bi-td')).nativeElement.textContent;
        expect(city).toBe(component.client.city);

        // #zipCode
        const zipCode = el.query(By.css('#bi-tr-zipCode .bi-td')).nativeElement.textContent;
        expect(zipCode).toBe(component.client.zipCode);

        // #id
        const id = el.query(By.css('#bi-tr-id .bi-td')).nativeElement.textContent;
        expect(id).toBe(component.client.id);

        // #createdAt
        const createdAt = el.query(By.css('#bi-tr-createdAt .bi-td')).nativeElement.textContent;
        expect(createdAt).toBe(datePipe.transform(component.client.createdAt, 'dd.MM.y o HH:mm'));

        // #createdAt
        const updatedAt = el.query(By.css('#bi-tr-updatedAt .bi-td')).nativeElement.textContent;
        expect(updatedAt).toBe(datePipe.transform(component.client.updatedAt, 'dd.MM.y o HH:mm'));
    });

    it('should call editClient()', () => {
        spyOn(component, 'editClient');

        el.query(By.css('#edit-client')).nativeElement.click();

        expect(component.editClient).toHaveBeenCalledTimes(1);
    });

    it('should open dialog and afterClose get client', fakeAsync(() => {
        component.editClient();
        fixture.detectChanges();
        flush();

        component['dialog']?.afterOpened().subscribe((data) => {
            expect(document.querySelector('h2')?.textContent?.length).toBeGreaterThan(0);
        });

        component['dialog'].close({ status: 'edited' });

        fixture.detectChanges();
        flush();

        const req = httpTestingController.expectOne(
            `http://localhost:3000/v1/client/623982a816b554bda9b9a301`
        );

        expect(req.request.method).toEqual('GET');
    }));

    afterEach(() => {
        httpTestingController.verify();
    });
});
